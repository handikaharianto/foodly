import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const getTimeFromNow = (time: string) => {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
};
