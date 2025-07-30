import { Request, Response } from "express";
import z from "zod";

// import { membershipWithPeriodsListSchema } from "../validators/membership.validator";

import * as membershipService from "../services/membership.service";

export const getMembershipsWithPeriods = async (req: Request, res: Response): Promise<Response> => {
    const result = await membershipService.getMembershipsWithPeriods();
  
    /*
    const validation = membershipWithPeriodsListSchema.safeParse(result);
    if (!validation.success) {
      return res.status(500).json({
        error: "Invalid format",
        details: z.treeifyError(validation.error),
      });
    }
    */
  
    return res.status(200).json(result);
};