import { NextFunction, Request, Response } from "express";
import CommunityService from "./community.service";
import HTTP_STATUS from "../common/http-status-code";
import { z } from "zod";
import mongoose from "mongoose";

export const createCommunitySchema = z.object({
  name: z.string().min(1, { message: "Community name is required." }),
  type: z.string().min(1, { message: "Community type is required." }),
  description: z
    .string()
    .min(1, { message: "Community description is required." }),
  user: z.custom<mongoose.Types.ObjectId>(),
});

export const getAllCommunitiesSchema = z.object({
  limit: z.number().positive(),
  page: z.number().positive(),
});

export const getOneCommunitySchema = z.object({
  communityId: z.string(),
});

export const updateOneCommunitySchema = {
  params: z.object({
    communityId: z.string(),
  }),
  body: z.object({
    name: z.string().min(1, { message: "Community name is required." }),
    description: z
      .string()
      .min(1, { message: "Community description is required." }),
  }),
};

class CommunityController {
  private readonly _communityService;

  constructor(_communityService: CommunityService) {
    this._communityService = _communityService;
  }

  createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      type,
      foodPreferences,
      description,
      address,
      coordinate,
      user,
    } = req.body;

    try {
      const data = await this._communityService.createCommunity({
        name,
        type,
        foodPreferences,
        description,
        address,
        coordinate,
        user,
      });
      return res.status(HTTP_STATUS.CREATED_201).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getAllCommunities = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { limit, page } = req.body;
    const { _id: userId } = req.user;

    try {
      const data = await this._communityService.getAllCommunities(
        userId,
        limit,
        page
      );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getOneCommunity = async (req: Request, res: Response, next: NextFunction) => {
    const { communityId } = req.params;

    try {
      const data = await this._communityService.getOneCommunity(communityId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  updateOneCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { communityId } = req.params;
    const { name, description } = req.body;

    try {
      const data = await this._communityService.updateOneCommunity(
        communityId,
        {
          name,
          description,
        }
      );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default CommunityController;
