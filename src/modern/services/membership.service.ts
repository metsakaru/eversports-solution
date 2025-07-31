import { MembershipWithPeriods } from "../types/membership.types";
import * as membershipRepository from "../repositories/membership.repository";
import * as membershipPeriodRepository from "../repositories/membership-period.repository"
import { v4 as uuidv4 } from "uuid";
import { calculateValidUntil, determineState, generateMembershipPeriods } from "../utils/membership.utils";
import { MembershipCreateRequest } from "../validators/membership.validator";

export async function getMembershipsWithPeriods(): Promise<MembershipWithPeriods[]> {
  const memberships = await membershipRepository.getAll();
  const existingMembershipPeriods = await membershipPeriodRepository.getAll();

  return memberships.map(membership => {
    const membershipPeriods = existingMembershipPeriods.filter(p => p.membership === membership.id);
    return { membership, membershipPeriods };
  })
};

export async function createMembershipWithPeriods(
  data: MembershipCreateRequest
): Promise<MembershipWithPeriods> {
  const memberships = await membershipRepository.getAll();

  const validFrom = data.validFrom ? new Date(data.validFrom) : new Date();
  const validUntil = calculateValidUntil(validFrom, data.billingInterval, data.billingPeriods);
  const state = determineState(validFrom, validUntil);

  const newMembership = {
    id: memberships.length + 1,
    uuid: uuidv4(),
    name: data.name,
    user: 2000,
    recurringPrice: parseFloat(data.recurringPrice.toFixed(1)),
    validFrom,
    validUntil,
    state,
    paymentMethod: data.paymentMethod,
    billingInterval: data.billingInterval,
    billingPeriods: data.billingPeriods,
  };

  await membershipRepository.save(newMembership);

  const membershipPeriods = generateMembershipPeriods(
    validFrom,
    data.billingInterval,
    data.billingPeriods,
    newMembership.id
  );

  for (const period of membershipPeriods) {
    await membershipPeriodRepository.save(period);
  }

  return {
    membership: newMembership,
    membershipPeriods: membershipPeriods,
  };
}