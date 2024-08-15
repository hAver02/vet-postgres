const petsController = require('../controller/pet.controller.js');
const { Router } = require("express");
const VerifyToken = require('../middlewares/jwtMiddleware.js');
const verifyRole = require('../middlewares/rolesMiddleware.js');

const petsRouter = Router();



petsRouter.get('/',VerifyToken, verifyRole([1,2]) ,petsController.getAll);
petsRouter.get("/getByUser/:userId", VerifyToken, verifyRole([1,2,3]) ,petsController.getPetsByUser);

petsRouter.post("/",VerifyToken, verifyRole([1,2]) ,petsController.createPet);

petsRouter.delete("/:id", petsController.deletePet);

petsRouter.put("/updateInfo/:id", petsController.updateInfoPet)


module.exports = petsRouter;

