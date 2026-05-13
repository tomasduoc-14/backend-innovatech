const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'innovatech',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123'
});

async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100),
            precio DECIMAL(10,2)
        );
    `);

    const { rows } = await pool.query('SELECT COUNT(*) FROM productos');
    if (rows[0].count === '0') {
        await pool.query(`
            INSERT INTO productos (nombre, precio) VALUES
            ('Producto A', 9990),
            ('Producto B', 19990),
            ('Producto C', 29990);
        `);
    }
}

async function getProductos() {
    const { rows } = await pool.query('SELECT * FROM productos');
    return rows;
}

initDB().catch(console.error);

module.exports = { getProductos };
