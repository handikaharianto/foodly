import { Router } from "express";
import authorizeUser from "../common/middlewares/authorize-user";
import verifyJWT from "../common/middlewares/verify-access-token.middleware";
import { UserRole } from "../user/types";
import DashboardController from "./dashboard.controller";
import DashboardService from "./dashboard.service";

const dashboardRouter = Router();

const dashboardController = new DashboardController(new DashboardService());

dashboardRouter.get(
  "/total-users",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR),
  dashboardController.getTotalUsers
);

dashboardRouter.get(
  "/total-communities",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR),
  dashboardController.getTotalCommunities
);

dashboardRouter.get(
  "/total-donations",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR),
  dashboardController.getTotalDonations
);

dashboardRouter.get(
  "/donations-by-month",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR),
  dashboardController.getTotalDonationsByMonth
);

dashboardRouter.get(
  "/donation-status",
  verifyJWT,
  authorizeUser(UserRole.ADMINISTRATOR),
  dashboardController.getDonationStatus
);

export default dashboardRouter;
