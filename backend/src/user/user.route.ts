import { Router } from "express";

import UserController, {
  createUserSchema,
  loginUserSchema,
} from "./user.controller";
import UserService from "./user.service";
import { validateRequestBody } from "zod-express-middleware";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";

const userController = new UserController(new UserService());

const userRouter = Router();

userRouter
  .route("/register")
  .post(validateRequestBody(createUserSchema), userController.createUser);

userRouter
  .route("/login")
  .post(validateRequestBody(loginUserSchema), userController.loginUser);

userRouter.route("/refresh").post(userController.refreshAccessToken);

userRouter.route("/test").get(verifyJWT, userController.testUser);

export default userRouter;
