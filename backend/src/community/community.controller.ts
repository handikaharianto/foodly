import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import CommunityService from "./community.service";
import HTTP_STATUS from "../common/http-status-code";

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

class CommunityController {
  private readonly _communityService;

  constructor(_communityService: CommunityService) {
    this._communityService = _communityService;
  }

  createCommunityApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, type, description } = req.body;
    const { _id } = req.user;

    try {
      const data = await this._communityService.createCommunityApplication({
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

  getOneCommunityApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { _id } = req.user;

    try {
      const data = await this._communityService.getOneCommunityApplication(_id);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getAllCommunities = async () => {
    // setup pagination (20 items per page)
  };

  updateCommunity = async () => {};
}

export default CommunityController;
