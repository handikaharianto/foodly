import { User } from "../features/user/types";

export const getSender = (loggedInUser: User, users: User[]): string => {
  return users[0]._id === loggedInUser._id
    ? `${users[1].firstName} ${users[1].lastName}`
    : `${users[0].firstName} ${users[0].lastName}`;
};
