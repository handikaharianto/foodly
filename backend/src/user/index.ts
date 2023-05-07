import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import { z } from "zod";

import UserController, { createUserSchema } from "./user.controller";
import UserService from "./user.service";
import validateRequest from "../common/middlewares/validate-request.middleware";

const userController = new UserController(new UserService());

const userRouter = Router();

userRouter
  .route("/register")
  .post(validateRequest(createUserSchema), userController.createUser);

userRouter.route("/login").post(userController.loginUser);

export default userRouter;
