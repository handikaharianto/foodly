import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import HTTP_STATUS from "../common/http-status-code";
import UserService from "./user.service";

export const createUserSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required.",
    })
    .min(1, { message: "First name is required" }),
  lastName: z
    .string({
      required_error: "Last name is required.",
    })
    .min(1, { message: "Last name is required" }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email." }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(1, { message: "Password is required" }),
});

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .min(1, { message: "Email is required" }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(1, { message: "Password is required" }),
});

class UserController {
  private readonly _userService;

  constructor(_userService: UserService) {
    this._userService = _userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      await this._userService.createUser({
        firstName,
        lastName,
        email,
        password,
      });
      return res.status(HTTP_STATUS.NO_CONTENT_204).send();
    } catch (error: any) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const data = await this._userService.loginUser(email, password);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  refreshAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { refreshToken } = req.body;

    try {
      const data = await this._userService.refreshAccessToken(refreshToken);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  testUser = async (req: Request, res: Response) => {
    return res.status(200).json({ success: true });
  };
}

export default UserController;
