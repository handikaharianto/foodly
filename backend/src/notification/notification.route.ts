import { Router } from "express";
import authorizeUser from "../common/middlewares/authorize-user";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import { UserRole } from "../user/types";
import NotificationController from "./notification.controller";
import NotificationService from "./notification.service";

const notificationRouter = Router();

const notificationController = new NotificationController(
  new NotificationService()
);

notificationRouter.post(
  "/list",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
  notificationController.getAllNotifications
);

notificationRouter.put(
  "/",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
  notificationController.updateManyNotifications
);

notificationRouter
  .route("/:notificationId")
  .put(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
    notificationController.updateOneNotification
  );

export default notificationRouter;
