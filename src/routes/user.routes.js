const { Router } = require("express");
const userController = require("../controller/user.controller");
const VerifyToken = require("../middlewares/jwtMiddleware");
const verifyRole = require("../middlewares/rolesMiddleware");

const userRouter = Router()

userRouter.post('/register', userController.register);
userRouter.post("/login", userController.login)

userRouter.get("/",VerifyToken, verifyRole([1]),userController.getAll)
userRouter.get('/:email', VerifyToken, verifyRole([1,2]) ,userController.getById)

//Cliente a veterinario!
userRouter.put("/updateUser/:id",VerifyToken, verifyRole([1]) ,userController.updateCtoV)


userRouter.delete("/:id", VerifyToken, verifyRole([1]), userController.deleteUser);

module.exports = userRouter;