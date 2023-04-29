import { Router } from "express";

import UserController from "./user.controller";
import UserService from "./user.service";

const userController = new UserController(new UserService());

const userRouter = Router();

userRouter.route("/register").post(userController.createUser);

export default userRouter;
