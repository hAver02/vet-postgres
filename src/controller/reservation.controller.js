const reservaModel = require("../model/reservation.model")


const createReserva = async (req, res) => {
    const { pet, vet, date, description } = req.body;
    // console.log();
    if(!pet || !vet || !date || !description) return res.json({ ok : false, msg : "bad Request"});

    try {
        const data = await reservaModel.createReserva(pet, vet, date, description);
        console.log(data);
        return res.json({ ok : true, msg : "Reservation created succesfully!", reserva : data})
    } catch (error) {
        console.log(error);
        res.json({ ok : false, msg : 'Error creating reservation'})
    }
}

module.exports = {
    createReserva
}