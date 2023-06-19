import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const getTimeFromNow = (time: string) => {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
};

export const setChatMessageTime = (time: string) => {
  dayjs.extend(calendar);

  const formattedTime = dayjs(time).calendar(null, {
    sameDay: "h:mm A", // The same day ( 2:30 AM )
    nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
    nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
    lastDay: "[Yesterday]", // The day before ( Yesterday )
    lastWeek: "[Last] dddd", // Last week ( Last Monday )
    sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
  });

  return formattedTime;
};

export const setDate = (time: string) => {
  dayjs.extend(localizedFormat);

  return dayjs(time).format("LLL");
};
