import ApiError from "../common/api-error";
import { UserRole, UserWithoutPassword } from "../user/types";
import notificationModel from "./notification.model";
import { NewNotification, Notification } from "./types";
import HTTP_STATUS from "../common/http-status-code";
import { NOTIFICATION_NOT_FOUND } from "../common/error-message";

class NotificationService {
  createNotification = async (
    newNotification: NewNotification
  ): Promise<Notification> => {
    let notification = await notificationModel.create(newNotification);

    notification = await notification.populate<{ sender: UserWithoutPassword }>(
      {
        path: "sender",
        select: "-password",
      }
    );

    notification = await notification.populate<{
      receiver: UserWithoutPassword;
    }>({
      path: "receiver",
      select: "-password",
    });

    return notification;
  };

  getAllNotifications = async (filter: {
    receiver?: string;
    isRead?: boolean;
    target?: UserRole;
  }): Promise<Notification[]> => {
    const data = await notificationModel
      .find(filter, null, {
        sort: "-createdAt",
      })
      .populate<{ sender: UserWithoutPassword }>({
        path: "sender",
        select: "-password",
      })
      .populate<{
        receiver: UserWithoutPassword;
      }>({
        path: "receiver",
        select: "-password",
      });

    return data;
  };

  updateOneNotification = async (
    notificationId: string,
    updateBody: { isRead: boolean }
  ): Promise<Notification> => {
    const notification = await notificationModel
      .findByIdAndUpdate(notificationId, updateBody, {
        runValidators: true,
        new: true,
      })
      .populate<{ sender: UserWithoutPassword }>({
        path: "sender",
        select: "-password",
      })
      .populate<{
        receiver: UserWithoutPassword;
      }>({
        path: "receiver",
        select: "-password",
      });
    if (!notification)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, NOTIFICATION_NOT_FOUND);

    return notification;
  };

  updateManyNotifications = async (
    filter: {
      receiver: string;
    },
    updateBody: { isRead: boolean }
  ): Promise<void> => {
    await notificationModel.updateMany(filter, updateBody);
  };
}

export default NotificationService;
