const pool = require("../database/connection");


const createReserva = async (pet, vet, date, description) => {
    try {
        const query = {
            text : `INSERT INTO reservations(pet, vet, reservation_date, description) VALUES
                    ($1, $2, $3, $4) RETURNING *`,
            values : [pet, vet, date, description]
        }
        const {rows} = await pool.query(query);
        return rows[0]
    } catch (error) {
    
        console.log("Error creating reservas!");
    }
}

const getReserva = async () => {
    try {
        const query = { 
            text : '',

        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createReserva,
    getReserva
}