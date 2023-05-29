import ApiError from "../common/api-error";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../common/auth";
import {
  INVALID_REFRESH_TOKEN,
  USER_EXISTS_ERROR,
  USER_NOT_FOUND,
  USER_WRONG_PASSWORD,
} from "../common/error-message";
import HTTP_STATUS from "../common/http-status-code";
import {
  LoginUser,
  NewUser,
  User,
  UserRole,
  UserWithoutPassword,
} from "./types";
import { refreshTokenModel, userModel } from "./user.model";

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
      role: userData.role || UserRole.PUBLIC,
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

    await this.removeRefreshToken(user.id);

    const accessToken = generateAccessToken<UserWithoutPassword>(userData);
    const refreshToken = await this.createRefreshToken(user.id);

    return { ...userData, accessToken, refreshToken };
  };

  createRefreshToken = async (userId: string): Promise<string> => {
    const refreshToken = generateRefreshToken();

    refreshTokenModel.create({
      token: refreshToken,
      user: userId,
    });

    return refreshToken;
  };

  removeRefreshToken = async (userId: string): Promise<void> => {
    const test = await refreshTokenModel.deleteMany({ user: userId });
  };

  refreshAccessToken = async (refreshToken: string): Promise<LoginUser> => {
    const token = await refreshTokenModel.findOne({ token: refreshToken });

    if (!token)
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, INVALID_REFRESH_TOKEN);

    const isTokenExpired = new Date() > new Date(token.expirationDate);

    if (isTokenExpired)
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, INVALID_REFRESH_TOKEN);

    const user = await userModel.findById(token.user);
    if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, USER_NOT_FOUND);

    const { password, ...userData } = user.toObject();
    const accessToken = generateAccessToken<UserWithoutPassword>(userData);

    return { ...userData, accessToken, refreshToken };
  };
}

export default UserService;
