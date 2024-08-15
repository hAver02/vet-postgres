const { Router } = require("express");
const reservaController = require("../controller/reservation.controller.js");

const reservaRoute = Router();

reservaRoute.post('/', reservaController.createReserva)







module.exports = reservaRoute;