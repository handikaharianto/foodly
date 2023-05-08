import ApiError from "../common/api-error";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
} from "../common/auth";
import {
  USER_EXISTS_ERROR,
  USER_NOT_FOUND,
  USER_WRONG_PASSWORD,
} from "../common/error-message";
import HTTP_STATUS from "../common/http-status-code";
import { LoginUser, NewUser, User, UserRole } from "./types";
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
      role: UserRole.PUBLIC,
    });
    return user;
  };

  loginUser = async (email: string, password: string): Promise<LoginUser> => {
    let user = await userModel.findOne({
      email,
    });
    if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, USER_NOT_FOUND);

    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches)
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, USER_WRONG_PASSWORD);

    const { password: userPassword, ...userData } = user.toObject();

    const accessToken = generateAccessToken<Omit<User, "password">>(userData);
    const refreshToken = generateRefreshToken();

    return { ...userData, accessToken, refreshToken };
  };
}

export default UserService;
