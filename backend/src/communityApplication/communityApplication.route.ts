import { validateRequestBody } from "zod-express-middleware";
import { Router } from "express";

import CommunityApplicationController, {
  createCommunityApplicationSchema,
} from "./communityApplication.controller";
import CommunityApplicationService from "./communityApplication.service";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import { UserRole } from "../user/types";
import authorizeUser from "../common/middlewares/authorize-user";

const communityApplicationController = new CommunityApplicationController(
  new CommunityApplicationService()
);
const communityApplicationRouter = Router();

communityApplicationRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    validateRequestBody(createCommunityApplicationSchema),
    communityApplicationController.createCommunityApplication
  );

communityApplicationRouter
  .route("/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.PUBLIC, UserRole.COMMUNITY),
    communityApplicationController.getAllCommunityApplications
  );

communityApplicationRouter
  .route("/:communityApplicationId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY, UserRole.ADMINISTRATOR),
    communityApplicationController.getOneCommunityApplication
  );

communityApplicationRouter
  .route("/:communityApplicationId")
  .put(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR),
    communityApplicationController.updateOneCommunityApplication
  );

export default communityApplicationRouter;
