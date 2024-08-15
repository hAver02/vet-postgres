
const pool = require("../database/connection.js");


const create = async ({email, password, username}) => {
    try {
        const query = {
            text : `INSERT INTO USERS (email, password, username) VALUES ($1, $2, $3) RETURNING  email, username, uid, role_id`,
            values: [email, password, username]
        }
        const {rows} = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.log('Error creating problem');
    }
}

const findByEmail = async ( email ) => {
    try {
        const query = {
            text : 'SELECT * FROM USERS WHERE EMAIL = $1',
            values : [email]
        }
        const { rows } = await pool.query(query)
        return rows[0];
    } catch (error) {
        console.log('Error finding by email');
    }
}

const findAll = async ( )=> {
    try {
        const query = {
            text : "SELECT * FROM USERS",   
        }
        const {rows } = await pool.query(query);

        return rows
    } catch (error) {
        console.log(error);
    }
}

const updateClientToVet = async (id) => {
    try {
        const query = {
            text : ` UPDATE USERS SET ROLE_ID = 2 WHERE UID = $1`,
            values : [id]
        }
        const {rowCount} = await pool.query(query);
    
        return rowCount;
    } catch (error) {
        console.log(error);
        
    }
}

const deleteClient = async (id) => {
    try {
        const query = {
            text : `DELETE FROM users WHERE ID = $1`,
            values : [id]
        }
        const data = await pool.query(query);
        console.log(data);
        return data.rows
    } catch (error) {
        console.log(error);
    }
}

const findById = async (id) => {
    // console.log(id);
    try {
        const query = {
            text : `SELECT * from users WHERE uid = $1`,
            values : [id]
        }
        const { rows } = await pool.query(query);
        return rows
    } catch (error) {
        console.log(error);
    }
}

module.exports =  {
    create,
    findByEmail,
    findAll,
    updateClientToVet,
    deleteClient,
    findById

}