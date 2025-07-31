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

export async function save(newPeriod: MembershipPeriod): Promise<void> {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const periods: MembershipPeriod[] = JSON.parse(data);

  const formattedEntry = {
    ...newPeriod,
    start: new Date(newPeriod.start.toISOString().slice(0, 10)),
    end: new Date(newPeriod.end.toISOString().slice(0, 10)),
  };

  periods.push(formattedEntry);

  await fs.writeFile(DATA_FILE, JSON.stringify(periods, null, 2), "utf-8");
}