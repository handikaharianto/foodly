import { Request, Response, NextFunction } from "express";
import DonationService from "./donation.service";
import HTTP_STATUS from "../common/http-status-code";

class DonationController {
  private readonly _donationService;

  constructor(_donationService: DonationService) {
    this._donationService = _donationService;
  }

  createDonation = async (req: Request, res: Response, next: NextFunction) => {
    const { items, community, donor } = req.body;

    try {
      await this._donationService.createDonation({
        ...items,
        community,
        donor,
      });
      return res.sendStatus(HTTP_STATUS.CREATED_201);
    } catch (error) {
      next(error);
    }
  };

  getAllDonations = async (req: Request, res: Response, next: NextFunction) => {
    const { limit, page, ...filter } = req.body;

    try {
      const data = await this._donationService.getAllDonations(
        filter,
        limit,
        page
      );
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateOneDonation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { status, items } = req.body;
    const { donationId } = req.params;

    try {
      const data = await this._donationService.updateOneDonation(donationId, {
        status,
        items,
      });
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getOneDonation = async (req: Request, res: Response, next: NextFunction) => {
    const { donationId } = req.params;

    try {
      const data = await this._donationService.getOneDonation(donationId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error) {
      next(error);
    }
  };

  deleteOneDonation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { donationId } = req.params;

    try {
      await this._donationService.deleteOneDonation(donationId);
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    } catch (error) {
      next(error);
    }
  };
}

export default DonationController;
