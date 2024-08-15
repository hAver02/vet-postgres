// import express from "express";
const express = require("express");
const  pool = require("./src/database/connection");
const userRouter = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");
const petsRouter = require("./src/routes/pets.route");
const reservaRoute = require("./src/routes/reser.route");
const PORT= 3000;


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true }));

app.use("/reservas", reservaRoute);
app.use('/users', userRouter);
app.use("/pets", petsRouter);

app.listen(PORT, () => console.log(`Corriendo en el puerto ${PORT}`));