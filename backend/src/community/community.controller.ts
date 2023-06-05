import { NextFunction, Request, Response } from "express";
import CommunityService from "./community.service";
import HTTP_STATUS from "../common/http-status-code";

class CommunityController {
  private readonly _communityService;

  constructor(_communityService: CommunityService) {
    this._communityService = _communityService;
  }

  createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, description, user } = req.body;

    try {
      await this._communityService.createCommunity({
        name,
        type,
        description,
        user,
      });
      return res.status(HTTP_STATUS.CREATED_201).send();
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

    try {
      const data = await this._communityService.getAllCommunities(limit, page);
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
