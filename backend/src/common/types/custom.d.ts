import { UserWithoutPassword } from "src/user/types";

declare global {
  namespace Express {
    export interface Request {
      user: UserWithoutPassword;
    }
  }
}
