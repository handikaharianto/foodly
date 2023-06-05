import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import CommunityApplicationService from "./communityApplication.service";
import HTTP_STATUS from "../common/http-status-code";
import { UserRole } from "../user/types";

export const createCommunityApplicationSchema = z.object({
  name: z
    .string({
      required_error: "Community name is required.",
    })
    .min(1, { message: "Community name is required" }),
  type: z
    .string({
      required_error: "Community type is required.",
    })
    .min(1, { message: "Community type is required" }),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(1, { message: "Description is required" }),
});

class CommunityApplicationController {
  private readonly _communityApplicationService;

  constructor(_communityService: CommunityApplicationService) {
    this._communityApplicationService = _communityService;
  }

  createCommunityApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, type, description } = req.body;
    const { _id } = req.user;

    try {
      const data =
        await this._communityApplicationService.createCommunityApplication({
          name,
          type,
          description,
          user: _id,
        });
      return res.status(HTTP_STATUS.CREATED_201).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getAllCommunityApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { limit, page, searchInput, ...filter } = req.body;
    const { _id: userId, role: userRole } = req.user;

    // public user can only fetch data associated to their account
    if (userRole === UserRole.PUBLIC) {
      filter.user = userId;
    }

    try {
      const data =
        await this._communityApplicationService.getAllCommunityApplications(
          limit,
          page,
          searchInput,
          filter
        );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getOneCommunityApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { communityApplicationId } = req.params;

    try {
      const data =
        await this._communityApplicationService.getOneCommunityApplication(
          communityApplicationId
        );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default CommunityApplicationController;
