import { Router } from "express";

import CommunityController, {
  createCommunityApplicationSchema,
} from "./community.controller";
import CommunityService from "./community.service";
import { validateRequestBody } from "zod-express-middleware";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";

const communityController = new CommunityController(new CommunityService());

const communityRouter = Router();

communityRouter
  .route("/application")
  .post(
    verifyJWT,
    validateRequestBody(createCommunityApplicationSchema),
    communityController.createCommunityApplication
  )
  .get(verifyJWT, communityController.getOneCommunityApplication);

export default communityRouter;
