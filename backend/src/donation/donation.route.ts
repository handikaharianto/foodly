import { Router } from "express";
import authorizeUser from "../common/middlewares/authorize-user";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import { UserRole } from "../user/types";
import DonationController from "./donation.controller";
import DonationService from "./donation.service";

const donationRouter = Router();

const donationController = new DonationController(new DonationService());

donationRouter.post(
  "/",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR, UserRole.PUBLIC),
  donationController.createDonation
);

donationRouter.post(
  "/list",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
  donationController.getAllDonations
);

donationRouter
  .route("/:donationId")
  .put(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
    donationController.updateOneDonation
  )
  .get(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.COMMUNITY, UserRole.PUBLIC),
    donationController.getOneDonation
  )
  .delete(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.PUBLIC),
    donationController.deleteOneDonation
  );

export default donationRouter;
