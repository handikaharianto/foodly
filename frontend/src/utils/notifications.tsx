import { MantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconInfoSmall,
  IconExclamationMark,
  IconX,
} from "@tabler/icons-react";
import React from "react";

export enum NotificationVariant {
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
}

type NotificationVariantType = {
  title: string;
  color: MantineColor;
  icon: React.ReactNode;
};

const notificationVariant: {
  [key in NotificationVariant]: NotificationVariantType;
} = {
  [NotificationVariant.SUCCESS]: {
    title: "Success",
    color: "green",
    icon: <IconCheck />,
  },
  [NotificationVariant.ERROR]: {
    title: "Error",
    color: "red",
    icon: <IconX />,
  },
  [NotificationVariant.WARNING]: {
    title: "Warning",
    color: "yellow",
    icon: <IconExclamationMark />,
  },
  [NotificationVariant.INFO]: {
    title: "Info",
    color: "blue",
    icon: <IconInfoSmall size={100} />,
  },
};

type ShowNotificationType = {
  id?: string;
  message: string;
  variant: NotificationVariant;
};

export const showNotification = ({
  id,
  message,
  variant = NotificationVariant.INFO,
}: ShowNotificationType) => {
  notifications.show({
    id,
    message,
    withCloseButton: true,
    autoClose: 3000,
    ...notificationVariant[variant],
  });
};
