import { Router } from "express";

import CommunityController, {
  createCommunitySchema,
  getAllCommunitiesSchema,
  updateOneCommunitySchema,
} from "./community.controller";
import CommunityService from "./community.service";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import authorizeUser from "../common/middlewares/authorize-user";
import { UserRole } from "../user/types";
import { validateRequest, validateRequestBody } from "zod-express-middleware";

const communityController = new CommunityController(new CommunityService());

const communityRouter = Router();

communityRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR),
    validateRequestBody(createCommunitySchema),
    communityController.createCommunity
  );

communityRouter
  .route("/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
    validateRequestBody(getAllCommunitiesSchema),
    communityController.getAllCommunities
  );

communityRouter
  .route("/:communityId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
    communityController.getOneCommunity
  )
  .put(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY),
    validateRequest(updateOneCommunitySchema),
    communityController.updateOneCommunity
  );

export default communityRouter;
