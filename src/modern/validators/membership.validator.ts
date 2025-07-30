import { z } from "zod";

export const membershipSchema = z.object({
  name: z.string(),
  user: z.number(),
  recurringPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  state: z.string(),
  paymentMethod: z.string(),
  billingInterval: z.string(),
  billingPeriods: z.number(),
});

export const membershipPeriodSchema = z.object({
  membership: z.number(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  state: z.string(),
});

export const membershipWithPeriodsSchema = z.object({
  membership: membershipSchema,
  periods: z.array(membershipPeriodSchema),
});

export const membershipWithPeriodsListSchema = z.array(membershipWithPeriodsSchema);
