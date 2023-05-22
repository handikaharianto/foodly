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
  color: MantineColor;
  icon: React.ReactNode;
};

const notificationVariant: {
  [key in NotificationVariant]: NotificationVariantType;
} = {
  [NotificationVariant.SUCCESS]: {
    color: "green",
    icon: <IconCheck />,
  },
  [NotificationVariant.ERROR]: {
    color: "red",
    icon: <IconX />,
  },
  [NotificationVariant.WARNING]: {
    color: "yellow",
    icon: <IconExclamationMark />,
  },
  [NotificationVariant.INFO]: {
    color: "blue",
    icon: <IconInfoSmall size={100} />,
  },
};

type ShowNotificationType = {
  id?: string;
  title: string;
  message: string;
  variant: NotificationVariant;
};

export const showNotification = ({
  id,
  title,
  message,
  variant = NotificationVariant.INFO,
}: ShowNotificationType) => {
  notifications.show({
    id,
    title,
    message,
    withCloseButton: true,
    ...notificationVariant[variant],
  });
};
