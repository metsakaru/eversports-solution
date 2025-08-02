import request from 'supertest';
import { app } from '../../index';

describe('GET /memberships', () => {
  it('should return 200 and return expected data (validate only first object in array)', async () => {
    const res = await request(app).get('/memberships');

    const firstObject = res.body[0];

    expect(res.status).toBe(200);
    expect(firstObject).toMatchObject({
        membership: {
          id: 1,
          name: 'Platinum Plan',
          assignedBy: 'Admin',
          billingInterval: 'monthly',
          billingPeriods: 12,
          paymentMethod: 'credit card',
          recurringPrice: 150,
          state: 'active',
          userId: 2000,
          uuid: '123e4567-e89b-12d3-a456-426614174000',
          validFrom: '2023-01-01T00:00:00.000Z',
          validUntil: '2023-12-31T00:00:00.000Z',
        },
        membershipPeriods: expect.any(Array),
      });
    });
});