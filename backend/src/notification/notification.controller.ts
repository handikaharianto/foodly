import { NextFunction, Request, Response } from "express";
import NotificationService from "./notification.service";
import { NewNotification, Notification } from "./types";
import HTTP_STATUS from "../common/http-status-code";

class NotificationController {
  private readonly _notificationService;

  constructor(_notificationService: NotificationService) {
    this._notificationService = _notificationService;
  }

  createNotification = async (notification: NewNotification) => {
    try {
      const data = await this._notificationService.createNotification(
        notification
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getAllNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { isRead } = req.body;
    const { _id } = req.user;

    try {
      const data = await this._notificationService.getAllNotifications({
        receiver: _id,
        isRead,
      });
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateOneNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { isRead } = req.body;
    const { notificationId } = req.params;

    try {
      const data = await this._notificationService.updateOneNotification(
        notificationId,
        {
          isRead,
        }
      );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateManyNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { isRead } = req.body;
    const { _id } = req.user;

    try {
      await this._notificationService.updateManyNotifications(
        { receiver: _id },
        { isRead }
      );
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    } catch (error) {
      next(error);
    }
  };
}

export default NotificationController;
