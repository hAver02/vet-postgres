const { text } = require("express");
const pool = require("../database/connection");


const count = async () => {
    try {
        const query = {
            text : "SELECT COUNT(*) FROM PETS"
        }
        const { rows } = await pool.query(query)

        return parseInt(rows[0].count)
    } catch (error) {
        console.log('Error en counting');
    }
}

const getAll = async (limit = 5, page = 1) => {
    const offset = ( page - 1 ) * limit;
    try {
       const query =  {
        text : 'SELECT * FROM pets LIMIT $1 OFFSET $2',
        values : [limit, offset]
       }
       const {rows} = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getPetsByUserID = async (idUser) => {
    try {
        const query = {
            text : 'SELECT * FROM pets WHERE owner = $1',
            values : [idUser]
        }
        const {rows} = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const createPet = async (name, specie, breed, owner) => {
    try {
        const query = {
            text : `INSERT INTO pets (NAME,SPECIES,BREED,OWNER) VALUES($1, $2, $3, $4) RETURNING *`,
            values : [name, specie, breed, owner]
        }
        const {rows} = await pool.query(query);
        return rows
    } catch (error) {
        console.log(error);
    }
}

const deletePet = async (idPet) => {
    try {
        const query = {
            text : "DELETE FROM pets WHERE pid = $1",
            values : [idPet]
        }
        const data = await pool.query(query);
        return data;
    } catch (error) {
        console.log(error);
        console.log('Error deleting pet');
    }
} 

const getById = async (idPet) => {
    try {
        const query = {
            text : 'SELECT * FROM pets WHERE pid = $1',
            values : [idPet]
            }
        const {rows} = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


const updateInfoPet = async (idPet, name, species, breed) => {
    try {
        const query = {
            text : "UPDATE pets SET name=$1, species=$2, breed=$3 WHERE pid=$4 ",
            values : [name, species, breed, idPet]
        }
        const data = await pool.query(query);
        return data;


    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAll, getPetsByUserID, createPet, count, deletePet, updateInfoPet, getById}