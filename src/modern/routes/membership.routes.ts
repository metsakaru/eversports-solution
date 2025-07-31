import express, { Request, Response } from "express"
import { getMembershipsWithPeriods, createMembership } from "../controllers/membership.controller";

const router = express.Router();

router.get("/", getMembershipsWithPeriods);

router.post("/", createMembership);

export default router;
