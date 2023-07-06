import { Request, Response, NextFunction } from "express";

import DashboardService from "./dashboard.service";
import HTTP_STATUS from "../common/http-status-code";

class DashboardController {
  private readonly _dashboardService;

  constructor(_dashboardService: DashboardService) {
    this._dashboardService = _dashboardService;
  }

  getTotalUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._dashboardService.getTotalUsers();
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getTotalCommunities = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._dashboardService.getTotalCommunities();
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getTotalDonations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._dashboardService.getTotalDonations();
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getTotalDonationsByMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._dashboardService.getTotalDonationsByMonth();
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getDonationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._dashboardService.getDonationStatus();
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default DashboardController;
