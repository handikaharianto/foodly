import ApiError from "../common/api-error";
import { hashPassword } from "../common/auth";
import { USER_EXISTS_ERROR } from "../common/error-message";
import HTTP_STATUS from "../common/http-status-code";
import { NewUser, User } from "./types";
import { userModel } from "./user.model";

class UserService {
  createUser = async (userData: NewUser): Promise<User> => {
    let user = await userModel.findOne({
      email: userData.email,
    });
    if (user) throw new ApiError(HTTP_STATUS.CONFLICT_409, USER_EXISTS_ERROR);

    const hashedPassword = await hashPassword(userData.password);

    user = await userModel.create({
      ...userData,
      password: hashedPassword,
    });
    return user;
  };

  loginUser = async (email: string, password: string) => {};
}

export default UserService;
