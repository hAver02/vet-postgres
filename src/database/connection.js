
const { Pool } = require('pg')
// import { Pool } from 'pg';
// Configura los parámetros de conexión
const pool = new Pool({
    user: 'luchi',        
    host: 'localhost',     // Ho
    database: 'my_store',  
    password: 'admin123',  
    port: 5432,            
  });
async function proof() {
    try {
         await pool.query("SELECT NOW()");
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.log(error);
    }
    
}
proof()
module.exports = pool;
