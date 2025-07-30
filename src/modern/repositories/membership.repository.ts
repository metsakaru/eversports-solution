import fs from "fs/promises";
import path from "path";

import { Membership } from "../types/membership.types";

const DATA_FILE = path.resolve(__dirname, "../../data/memberships.json");

export async function getAll(): Promise<Membership[]> {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const memberships: Membership[] = JSON.parse(data).map(m => ({
    ...m,
    validFrom: new Date(m.validFrom),
    validUntil: new Date(m.validUntil),
  }));
  return memberships;
}

export async function findByName(name: string): Promise<Membership | undefined> {
  const memberships = await getAll();
  return memberships.find(m => m.name === name);
}
