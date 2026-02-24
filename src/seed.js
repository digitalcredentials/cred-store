import mariadb from 'mariadb';
import pool from './pool.js';
import { credentials, templates, batches, categories, holders } from './seedData.js';

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
        await conn.query(`DROP TABLE IF EXISTS credential, category, batch, template, holder, notification, pickup;`);
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
                tenant_name VARCHAR(100) NOT NULL,
                category_id UUID,
                cred_template_id UUID,
                email_template_id UUID,
                holder_id UUID NOT NULL,
                status ENUM('pending', 'notified', 'collected', 'revoked', 'deactivated') NOT NULL DEFAULT 'pending',
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                date_notified DATETIME,
                date_collected DATETIME,
                date_revoked DATETIME,
                revoked_by VARCHAR(100),
                added_by VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            );
        `);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS template (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                template_json JSON NOT NULL,
                description VARCHAR(255),
                image_url VARCHAR(255) NOT NULL,
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
                email VARCHAR(100),
                org_id VARCHAR(100),
                did VARCHAR(255),
                PRIMARY KEY (id)
            );
        `)

         await conn.query(`
            CREATE TABLE IF NOT EXISTS batch (
                id UUID NOT NULL DEFAULT UUID(),
                name VARCHAR(100) NOT NULL,
                uploaded_csv BLOB,
                description VARCHAR(255),
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                PRIMARY KEY (id)
            );
        `)

         await conn.query(`
            CREATE TABLE IF NOT EXISTS category (
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
                INSERT IGNORE INTO credential (cred_name, cred_template_id, holder_id, added_by, category_id, status, date_added, tenant_name)
                VALUES ('${credential.cred_name}', '${credential.cred_template_id}', '${credential.holder_id}', '${credential.added_by}', '${credential.category_id}', '${credential.status ?? "pending"}', '${credential.date_added}', '${credential.tenant_name}')
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
                INSERT IGNORE INTO holder (id, name, email, org_id, did)
                VALUES ('${holder.id}','${holder.name}', '${holder.email}', '${holder.org_id}', ${holder.did ? "'" + holder.did + "'" : 'NULL'})
                `)
            )
        )

         const insertedTemplates = await Promise.all(
            templates.map(template => conn.query(`
                INSERT IGNORE INTO template (id, name, description, template_json, image_url)
                VALUES ('${template.id}', '${template.name}', '${template.description}', '${template.template_json}', '${template.image_url}')
                `)
            )
        )

        const insertedCategories = await Promise.all(
            categories.map(category => conn.query(`
                INSERT IGNORE INTO category (id, name, description)
                VALUES ('${category.id}', '${category.name}', '${category.description}')
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