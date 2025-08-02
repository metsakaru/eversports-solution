import { calculateValidUntil, determineState } from '../utils/membership.utils';

describe('determineState()', () => {
    const testCases = [
        {
          name: 'active: now is between validFrom and validUntil',
          validFrom: new Date(Date.now() - 1000 * 60),
          validUntil: new Date(Date.now() + 1000 * 60),
          expected: 'active',
        },
        {
          name: 'pending: validFrom is in the future from now',
          validFrom: new Date(Date.now() + 1000 * 60),
          validUntil: new Date(Date.now() + 1000 * 120),
          expected: 'pending',
        },
        {
          name: 'expired: validUntil is in the past from now',
          validFrom: new Date(Date.now() - 1000 * 120),
          validUntil: new Date(Date.now() - 1000 * 60),
          expected: 'expired',
        },
    ];

    testCases.forEach(({ name, validFrom, validUntil, expected }) => {
        test(name, () => {
          expect(determineState(validFrom, validUntil)).toBe(expected);
        });
      });
});

describe('determineState()', () => {
    const testCases = [
        {
          name: 'monthly billing: add 3 months to january 31 (should be 01 of May)',
          input: {
            validFrom: new Date('2024-01-31'),
            billingInterval: 'monthly',
            billingPeriods: 3,
          },
          expected: new Date('2024-05-01'),
        },
        {
          name: 'yearly billing: add 2 years to february 29 (should be March 1st)',
          input: {
            validFrom: new Date('2024-02-29'),
            billingInterval: 'yearly',
            billingPeriods: 2,
          },
          expected: new Date('2026-03-01'),
        },
        {
          name: 'weekly billing: add 4 weeks to Aug 1, 2025',
          input: {
            validFrom: new Date('2025-08-01'),
            billingInterval: 'weekly',
            billingPeriods: 4,
          },
          expected: new Date('2025-08-29'),
        },
    ];
    
    describe('calculateValidUntil()', () => {
      testCases.forEach(({ name, input, expected }) => {
        it(name, () => {
          const result = calculateValidUntil(
            input.validFrom,
            input.billingInterval,
            input.billingPeriods
          );
          expect(result.toDateString()).toBe(expected.toDateString());
        });
      });
    });
    
});