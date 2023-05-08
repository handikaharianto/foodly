import { Router } from "express";

import UserController, {
  createUserSchema,
  loginUserSchema,
} from "./user.controller";
import UserService from "./user.service";
import { validateRequestBody } from "zod-express-middleware";

const userController = new UserController(new UserService());

const userRouter = Router();

userRouter
  .route("/register")
  .post(validateRequestBody(createUserSchema), userController.createUser);

userRouter
  .route("/login")
  .post(validateRequestBody(loginUserSchema), userController.loginUser);

export default userRouter;
