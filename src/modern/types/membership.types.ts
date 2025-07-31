export interface Membership {
    id: number
    name: string
    user: number
    recurringPrice: number
    validFrom: Date
    validUntil: Date
    state: string
    paymentMethod: string
    billingInterval: string
    billingPeriods: number
}

export interface MembershipPeriod {
    id: number
    membership: number
    uuid: string
    start: Date
    end: Date
    state: string
}

export interface MembershipWithPeriods {
    membership: Membership;
    membershipPeriods: MembershipPeriod[];
}
