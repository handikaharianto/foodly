import { Router } from "express";

import CommunityController, {
  createCommunityApplicationSchema,
} from "./community.controller";
import CommunityService from "./community.service";
import { validateRequestBody } from "zod-express-middleware";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import authorizeUser from "../common/middlewares/authorize-user";
import { UserRole } from "../user/types";

const communityController = new CommunityController(new CommunityService());

const communityRouter = Router();

communityRouter
  .route("/applications")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    validateRequestBody(createCommunityApplicationSchema),
    communityController.createCommunityApplication
  );

communityRouter
  .route("/applications/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR),
    communityController.getAllCommunityApplications
  );
// .get(
//   verifyJWT,
//   authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
//   communityController.getOneCommunityApplication
// )

export default communityRouter;
