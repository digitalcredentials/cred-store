import mariadb from 'mariadb';
import pool from './pool.js'

// Define connection parameters without specifying a 'database'
const connectionConfig = {
    host: 'localhost',
    port: 3306, // Default MariaDB port
    user: 'creduser', // User with CREATE privileges (e.g., 'root')
    password: 'creduser',
    connectionLimit: 1 // A simple connection is enough for this task
};

export async function createDatabase(dbName) {
    let conn;
    try {
        // Establish a connection to the server (not a specific database)
        conn = await mariadb.createConnection(connectionConfig);
        console.log("Connected to MariaDB server.");

        // Execute the CREATE DATABASE query
        const dbQuery = `CREATE DATABASE IF NOT EXISTS credentials`;
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

// Call the function to create your new database
//createDatabase();

export async function seedDatabase() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connected to database for seeding...');

        // --- Create Tables (if not already done) ---
        await conn.query(`
            CREATE TABLE IF NOT EXISTS credentials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cred_name VARCHAR(100) NOT NULL,
                holder VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE
            );
        `);

        // --- Insert Seed Data ---
        await conn.query("INSERT INTO credentials (cred_name, holder, email) VALUES (?, ?, ?)", ["Badge of Honour", "Alice Allright", "alice@example.com"]);
        await conn.query("INSERT INTO credentials (cred_name, holder, email) VALUES (?, ?, ?)", ["Deputy of Doubt", "Bob Best", "bob@example.com"]);
        console.log('Credentials seeded successfully!');

    } catch (err) {
        console.error('Error during database seeding:', err);
    } finally {
        if (conn) {
            conn.release(); // Release the connection back to the pool
            console.log('Connection released.');
        }
       // pool.end(); // Close the pool when done
    }
}

//seedDatabase();