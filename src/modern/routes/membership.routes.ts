import express, { Request, Response } from "express"
import { getMembershipsWithPeriods } from "../controllers/membership.controller";

const router = express.Router();

router.get("/", getMembershipsWithPeriods);

router.post("/", (req: Request, res: Response) => {
  throw new Error('not implemented')
})

export default router;
