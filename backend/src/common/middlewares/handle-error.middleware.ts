import { Request, Response, NextFunction } from "express";

import ApiError from "../api-error";
import { INTERNAL_SERVER_ERROR } from "../error-message";
import HTTP_STATUS from "../http-status-code";

const handleError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = err.code || HTTP_STATUS.INTERNAL_SERVER_ERROR_500;
  const message = err.message || INTERNAL_SERVER_ERROR;

  return res.status(code).json({ error: message });
};

export default handleError;
