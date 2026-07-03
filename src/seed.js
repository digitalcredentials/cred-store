import mariadb from 'mariadb';
import pool from './pool.js';
import { credentials, templates, batches, tags, holders, tenants } from './seedData.js';

// Define connection parameters without 
// specifying a 'database' because we haven't got one yet
const connectionConfig = {
    host: 'localhost',
    port: 3306, // Default MariaDB port
    user: 'creduser', 
    password: 'creduser',
    connectionLimit: 1 
};

export async function createDatabase(dbName) {
    let conn;
    try {
        // Establish a connection to the server,
        // but not to a specific database because we haven't got one yet
        conn = await mariadb.createConnection(connectionConfig);
        console.log("Connected to MariaDB server.");

        // Execute the CREATE DATABASE query
        const dbQuery = `CREATE DATABASE IF NOT EXISTS credential`;
        await conn.query(dbQuery);
        console.log(`Database credentials created.`);

    } catch (err) {
        console.error("Error creating database:", err);
    } finally {
        // Close the connection
        if (conn) {
            await conn.end();
            console.log("Connection closed.");
        }
    }
}

async function dropTables(conn) {

    try {
        console.log('Dropping all tables...');
        await conn.query(`DROP TABLE IF EXISTS credential, tag, batch, template, holder, notification, pickup, tenant;`);
        console.log('All tables successfully dropped.');
    } catch (err) {
        console.error('Error trying to drop tables:', err);
    } 
}

async function addTables(conn) {

    try {

        console.log('Creating tables...');

        await conn.query(`
            CREATE TABLE IF NOT EXISTS credential (
                id UUID NOT NULL DEFAULT UUID(),
                cred_name VARCHAR(100) NOT NULL,
                verifiable_credential JSON,
                batch_id UUID,
                tenant_id UUID NOT NULL,
                tag_id UUID,
                cred_template_id UUID,
                email_template_id UUID,
                holder_id UUID NOT NULL,
                valid_from DATE DEFAULT NULL,
                valid_until DATE DEFAULT NULL,
                status ENUM('hidden','collectable') NOT NULL DEFAULT 'collectable',
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                added_by VARCHAR(100) NOT NULL,
                updated_by VARCHAR(100),    
                PRIMARY KEY (id)
            );
        `);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS template (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                template_json JSON NOT NULL,
                description VARCHAR(255),
                fields JSON,
                PRIMARY KEY (id)
            );
        `)

        await conn.query(`
            CREATE TABLE IF NOT EXISTS pickup (
                id UUID NOT NULL DEFAULT UUID(),
                credential_id UUID NOT NULL,
                template_id UUID NOT NULL,
                date_collected DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                pickup_token UUID NOT NULL,
                PRIMARY KEY (id)
            );
        `)

        await conn.query(`
            CREATE TABLE IF NOT EXISTS notification (
                id UUID NOT NULL DEFAULT UUID(),
                credential_id UUID NOT NULL,
                holder_id UUID NOT NULL,
                email VARCHAR(100) NOT NULL,
                date_notifed DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                pickup_token UUID NOT NULL DEFAULT UUID(),
                PRIMARY KEY (id)
            );
        `)

        await conn.query(`
            CREATE TABLE IF NOT EXISTS holder (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                org_id VARCHAR(100),
                did VARCHAR(255),
                added_by VARCHAR(100) NOT NULL,
                updated_by VARCHAR(100),
                PRIMARY KEY (id)
            );
        `)

         await conn.query(`
            CREATE TABLE IF NOT EXISTS tenant (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL,
                issuer_name VARCHAR(100) NOT NULL,
                issuer_image_url VARCHAR(300) NOT NULL,
                issuer_url VARCHAR(300) NOT NULL,
                env_name VARCHAR(100) NOT NULL,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                added_by VARCHAR(100) NOT NULL,
                updated_by VARCHAR(100),
                PRIMARY KEY (id)
            );
        `)

         await conn.query(`
            CREATE TABLE IF NOT EXISTS batch (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                uploaded_csv BLOB,
                description VARCHAR(255),
                template_id UUID NOT NULL,
                tenant_id UUID NOT NULL,
                status ENUM('hidden','collectable') NOT NULL DEFAULT 'collectable',
                tag_id UUID,
                valid_from DATE DEFAULT NULL,
                valid_until DATE DEFAULT NULL,
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                PRIMARY KEY (id)
            );
        `)

         await conn.query(`
            CREATE TABLE IF NOT EXISTS tag (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255),
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `)

    } catch (err) {
        console.error('Error adding tables', err);
    } 
}


async function seedTables(conn) {

    try {
        console.log('Started seeding...');
        // --- Insert Seed Data ---
        const insertedCredentials = await Promise.all(
            credentials.map(credential => conn.query(`
                INSERT IGNORE INTO credential (cred_name, cred_template_id, holder_id, added_by, tag_id, status, valid_from, valid_until, date_added, tenant_id)
                VALUES (
                    '${credential.cred_name}', 
                    '${credential.cred_template_id}', 
                    '${credential.holder_id}', 
                    '${credential.added_by}', 
                    '${credential.tag_id}', 
                    '${credential.status}', 
                    ${credential.valid_from ? "'" + credential.valid_from + "'" : 'NULL'}, 
                    ${credential.valid_until ? "'" + credential.valid_until + "'" : 'NULL'}, 
                    '${credential.date_added}', 
                    '${credential.tenant_id}')
                `)
            )
        )

        const insertedBatches = await Promise.all(
            batches.map(batch => conn.query(`
                INSERT IGNORE INTO batch (name, description, uploaded_csv, added_by)
                VALUES ('${batch.name}', '${batch.description}', '${batch.uploaded_csv}', '${batch.added_by}')
                `)
            )
        )

        const insertedHolder = await Promise.all(
            holders.map(holder => conn.query(`
                INSERT IGNORE INTO holder (id, name, email, org_id, did, added_by)
                VALUES ('${holder.id}','${holder.name}', '${holder.email}', '${holder.org_id}', ${holder.did ? "'" + holder.did + "'" : 'NULL'}, '${holder.added_by}')
                `)
            )
        )

         const insertedTenants = await Promise.all(
            tenants.map(tenant => conn.query(`
                INSERT IGNORE INTO tenant (id, name, description, email, issuer_name, issuer_url, issuer_image_url, env_name )
                VALUES ('${tenant.id}','${tenant.name}', '${tenant.description}', '${tenant.email}', '${tenant.issuer_name}', '${tenant.issuer_url}', '${tenant.issuer_image_url}', '${tenant.env_name}' )
                `)
            )
        )

         const insertedTemplates = await Promise.all(
            templates.map(template => conn.query(`
                INSERT IGNORE INTO template (id, name, description, template_json, fields)
                VALUES ('${template.id}', '${template.name}', '${template.description}', '${template.template_json}', '${JSON.stringify(template.fields)}')
                `)
            )
        )

        const insertedTags = await Promise.all(
            tags.map(tag => conn.query(`
                INSERT IGNORE INTO tag (id, name, description)
                VALUES ('${tag.id}', '${tag.name}', '${tag.description}')
                `)
            )
        )
       

      console.log('Credentials seeded!');

    } catch (err) {
        console.error('Error during database seeding:', err);
    } 
}


export async function seedDatabase() {
   let conn;
  try {
    conn = await pool.getConnection();
    // start transaction (auto-commit is disabled on pooled connections)
    await conn.beginTransaction();
    await dropTables(conn);
    await addTables(conn);
    await seedTables(conn);
    await conn.commit();
     console.log("Transaction successful!");
    
  } catch (err) {
    // roll back the transaction if error
    if (conn) await conn.rollback();
    console.error("Transaction failed:", err);
    throw err; // re-throw for calling function to handle
  } finally {
    // release connection back to the pool
    if (conn) return conn.release();
  }
}