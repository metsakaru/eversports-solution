import { z } from "zod";

const paymentMethods = ["cash", "credit card"] as const;
const billingIntervals = ["weekly", "monthly", "yearly"] as const;

export const membershipSchema = z
  .object({
    name: z.string().min(1, { message: "missingMandatoryFields" }),
    recurringPrice: z
      .number()
      .refine((val) => val !== undefined && val !== null, {
        message: "missingMandatoryFields",
      })
      .nonnegative({ message: "negativeRecurringPrice" }),
    validFrom: z.coerce.date(),
    validUntil: z.coerce.date(),
    state: z.string(),
    paymentMethod: z.enum(paymentMethods).refine(
      (val) => paymentMethods.includes(val),
      { message: "missingMandatoryFields" }
    ),
    billingInterval: z.enum(billingIntervals).refine(
      (val) => billingIntervals.includes(val),
      { message: "invalidBillingPeriods" }
    ),
    billingPeriods: z.number(),
  })
  .superRefine((data, ctx) => {
    const { recurringPrice, paymentMethod, billingInterval, billingPeriods } = data;

    if (recurringPrice < 0) {
      ctx.addIssue({
        code: "custom",
        message: "negativeRecurringPrice",
        path: ["recurringPrice"],
      });
    }

    if (recurringPrice > 100 && paymentMethod === "cash") {
      ctx.addIssue({
        code: "custom",
        message: "cashPriceBelow100",
        path: ["recurringPrice"],
      });
    }

    if (billingInterval === "monthly") {
      if (billingPeriods > 12) {
        ctx.addIssue({
          code: "custom",
          message: "billingPeriodsMoreThan12Months",
          path: ["billingPeriods"],
        });
      } else if (billingPeriods < 6) {
        ctx.addIssue({
          code: "custom",
          message: "billingPeriodsLessThan6Months",
          path: ["billingPeriods"],
        });
      }
    }

    if (billingInterval === "yearly") {
      if (billingPeriods > 10) {
        ctx.addIssue({
          code: "custom",
          message: "billingPeriodsMoreThan10Years",
          path: ["billingPeriods"],
        });
      } else if (billingPeriods < 3) {
        ctx.addIssue({
          code: "custom",
          message: "billingPeriodsLessThan3Years",
          path: ["billingPeriods"],
        });
      }
    }
  });

export type MembershipCreateRequest = z.infer<typeof membershipSchema>;
