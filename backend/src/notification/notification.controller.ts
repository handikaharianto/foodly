import { NextFunction, Request, Response } from "express";
import NotificationService from "./notification.service";
import { NewNotification, Notification } from "./types";
import HTTP_STATUS from "../common/http-status-code";
import { UserRole } from "../user/types";

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
    const { _id, role } = req.user;

    const filter: any = {
      isRead,
    };
    if (role === UserRole.ADMINISTRATOR) {
      filter.target = UserRole.ADMINISTRATOR;
    } else {
      filter.receiver = _id;
    }

    try {
      const data = await this._notificationService.getAllNotifications(filter);
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
    const { isRead, receiver, target } = req.body;

    try {
      await this._notificationService.updateManyNotifications(
        { receiver },
        { isRead }
      );
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    } catch (error) {
      next(error);
    }
  };
}

export default NotificationController;
