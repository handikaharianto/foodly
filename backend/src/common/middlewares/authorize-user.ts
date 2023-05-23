import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../user/types";
import HTTP_STATUS from "../http-status-code";
import ApiError from "../api-error";
import { FORBIDDEN_ACCESS } from "../error-message";

const authorizeUser =
  (...acceptedRoles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (!role) throw new ApiError(HTTP_STATUS.FORBIDDEN_403, FORBIDDEN_ACCESS);
    if (!acceptedRoles.includes(role as UserRole))
      throw new ApiError(HTTP_STATUS.FORBIDDEN_403, FORBIDDEN_ACCESS);
    next();
  };

export default authorizeUser;
