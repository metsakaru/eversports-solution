import { Request, Response } from "express";
import { membershipSchema } from "../validators/membership.validator";
import * as membershipService from "../services/membership.service";

export const getMembershipsWithPeriods = async (req: Request, res: Response): Promise<Response> => {
  const result = await membershipService.getMembershipsWithPeriods();

  return res.status(200).json(result);
};

export const createMembership = async (req: Request, res: Response): Promise<Response> => {
  const request = membershipSchema.safeParse(req.body);

  if (!request.success) {
    const error = request.error.issues[0];
    return res.status(400).json({ message: error.message });
  }

  const data = request.data;
  const result = await membershipService.createMembershipWithPeriods(data);

  return res.status(200).json(result);
};