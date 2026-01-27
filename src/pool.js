import mariadb from 'mariadb';
const pool = mariadb.createPool({
    host: 'localhost', // Or your DB host
    user: 'creduser',
    password: 'creduser',
    connectionLimit: 5,
    database: 'credentials'
});

export default pool;

// pool.end(); // Close the pool when done