import { MembershipPeriod } from "../types/membership.types";
import { v4 as uuidv4 } from "uuid";

export function calculateValidUntil(
    validFrom: Date,
    billingInterval: string,
    billingPeriods: number
  ): Date {
    const validUntil = new Date(validFrom);
  
    if (billingInterval === "monthly") {
      validUntil.setMonth(validFrom.getMonth() + billingPeriods);
    } else if (billingInterval === "yearly") {
      validUntil.setMonth(validFrom.getMonth() + billingPeriods * 12);
    } else if (billingInterval === "weekly") {
      validUntil.setDate(validFrom.getDate() + billingPeriods * 7);
    }
  
    return validUntil;
}

export function determineState(
    validFrom: Date,
    validUntil: Date,
    now = new Date()
  ): "pending" | "active" | "expired" {
    if (validFrom > now) return "pending";
    if (validUntil < now) return "expired";
    return "active";
}
  
export function generateMembershipPeriods(
    validFrom: Date,
    billingInterval: string,
    billingPeriods: number,
    membershipId: number
  ): MembershipPeriod[] {
    const periods: MembershipPeriod[] = [];
    let periodStart = new Date(validFrom);
  
    for (let i = 0; i < billingPeriods; i++) {
      const validFrom = new Date(periodStart);
      const validUntil = new Date(validFrom);
  
      if (billingInterval === "monthly") {
        validUntil.setMonth(validFrom.getMonth() + 1);
      } else if (billingInterval === "yearly") {
        validUntil.setMonth(validFrom.getMonth() + 12);
      } else if (billingInterval === "weekly") {
        validUntil.setDate(validFrom.getDate() + 7);
      }
  
      periods.push({
        id: i + 1,
        uuid: uuidv4(),
        membership: membershipId,
        start: validFrom,
        end: validUntil,
        state: "planned",
      });
  
      periodStart = validUntil;
    }
  
    return periods;
}