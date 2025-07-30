import fs from "fs/promises";
import path from "path";
import { MembershipPeriod } from "../types/membership.types";

const DATA_FILE = path.resolve(__dirname, "../../data/membership-periods.json");

export async function getAll(): Promise<MembershipPeriod[]> {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const periods: MembershipPeriod[] = JSON.parse(data).map(p => ({
    ...p,
    start: new Date(p.start),
    end: new Date(p.end),
  }));
  return periods;
}