import { NextFunction, Request, Response } from "express";

import ApiError from "../common/api-error";
import HTTP_STATUS from "../common/http-status-code";
import { userModel } from "./user.model";
import UserService from "./user.service";

class UserController {
  private readonly _userService;

  constructor(_userService: UserService) {
    this._userService = _userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;
    // validate req.body
    try {
      const data = await this._userService.createUser({
        fullName,
        email,
        password,
      });
      return res.status(HTTP_STATUS.CREATED_201).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {};
}

export default UserController;
