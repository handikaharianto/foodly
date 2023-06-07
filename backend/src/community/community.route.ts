import { Router } from "express";

import CommunityController from "./community.controller";
import CommunityService from "./community.service";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import authorizeUser from "../common/middlewares/authorize-user";
import { UserRole } from "../user/types";

const communityController = new CommunityController(new CommunityService());

const communityRouter = Router();

communityRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR),
    communityController.createCommunity
  );

communityRouter
  .route("/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR),
    communityController.getAllCommunities
  );

communityRouter
  .route("/:communityId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY),
    communityController.getOneCommunity
  )
  .put(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY),
    communityController.updateOneCommunity
  );

export default communityRouter;
