import { MembershipWithPeriods } from "../types/membership.types";
import * as membershipRepository from "../repositories/membership.repository";
import * as membershipPeriodRepository from "../repositories/membership-period.repository"

export async function getMembershipsWithPeriods(): Promise<MembershipWithPeriods[]> {
  const memberships = await membershipRepository.getAll();
  const membershipPeriods = await membershipPeriodRepository.getAll();

  return memberships.map(membership => {
    const periods = membershipPeriods.filter(p => p.membership === membership.id);
    return { membership, periods };
  })
};