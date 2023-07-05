import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../auth";
import HTTP_STATUS from "../http-status-code";
import ApiError from "../api-error";
import { EXPIRED_ACCESS_TOKEN, INVALID_ACCESS_TOKEN } from "../error-message";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer"))
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, INVALID_ACCESS_TOKEN);

  const [bearer, accessToken] = authHeader.split(" ");

  if (accessToken === "null")
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, INVALID_ACCESS_TOKEN);

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED_401, EXPIRED_ACCESS_TOKEN));
  }
};

export default verifyJWT;
