import fs from "fs/promises";
import path from "path";

import { Membership, SerializedMembership } from "../types/membership.types";

const DATA_FILE = path.resolve(__dirname, "../../data/memberships.json");

export async function getAll(): Promise<Membership[]> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const serializedMemberships: SerializedMembership[] = JSON.parse(data);

  const memberships: Membership[] = serializedMemberships.map((m) => ({
    ...m,
    recurringPrice: parseFloat(m.recurringPrice),
    validFrom: new Date(m.validFrom),
    validUntil: new Date(m.validUntil),
  }));

  return memberships;
}

export async function save(newMembership: Membership): Promise<void> {
  const rawData = await fs.readFile(DATA_FILE, "utf-8");
  const memberships: Membership[] = JSON.parse(rawData);

  const formattedEntry = {
    ...newMembership,
    recurringPrice: parseFloat(newMembership.recurringPrice.toFixed(1)),
    validFrom: new Date(newMembership.validFrom.toISOString().slice(0, 10)),
    validUntil: new Date(newMembership.validUntil.toISOString().slice(0, 10)),
  };

  memberships.push(formattedEntry);

  await fs.writeFile(DATA_FILE, JSON.stringify(memberships, null, 2), "utf-8");
}
