# Solution documentation

In the following README file I will document the approach and steps I have taken in order to provide a solution for the task.

## Intro

First of all, reading the code gave me an understanding that there are several aspects that should be taken into account while transforming the code:

- Provide type-safety for both GET and POST requests to ensure data correctness during built-time. Meaning declaring and using the interfaces in API.
```sh
/src/modern/types/
```
- Provide data correctness via external library to ensure data correctess during real-time usage. I used zod library for validations.
```sh
/src/modern/validators/
```
- Extract the business logic into services, mock reading data to repositories and http calls into controllers to provide a cleaner way to maintain the routes and separate business and technical requirements in the API calls. Especially valid for POST request.
```sh
/src/modern/controllers/ -- handles incoming API request and delegates business logic to the services
/src/modern/repositories/ -- mocks data reading / writing part like we would do if we would have DB connection
/src/modern/services/ -- holds business logic / conditions
/src/modern/utils -- holds extracted utils functions that are separated from service layer for readability
```

Additionally I added ts-node-dev library to make sure I see code changes on the fly without re-building the service. Therefore service start should be done via:

```sh
npm install
npm run start:follow
```

### Validation via zod-schema

For validating schemas I have used zod library and for easier progress with test task solution zod-schema was created by AI with the following prompt:

```sh
Generate a Zod schema named membershipSchema validating a membership object with fields: name (required string), user (number), recurringPrice (non-negative number), validFrom and validUntil (dates, coerced), state (string with values "pending" | "active" | "expired"), paymentMethod (enum "cash" | "card" | "bank"), billingInterval (enum "weekly" | "monthly" | "yearly"), and billingPeriods (number).

Use these error messages for validation failures:

if (!name || recurringPrice === undefined) → "missingMandatoryFields"
if (recurringPrice < 0) → "negativeRecurringPrice"
if (recurringPrice > 100 && paymentMethod === "cash") → "cashPriceBelow100"
if (billingInterval === "monthly"):
  - billingPeriods > 12 → "billingPeriodsMoreThan12Months"
  - billingPeriods < 6 → "billingPeriodsLessThan6Months"
if (billingInterval === "yearly"):
  - billingPeriods > 10 → "billingPeriodsMoreThan10Years"
  - billingPeriods < 3 → "billingPeriodsLessThan3Years"
if (billingInterval !== "weekly" | "monthly" | "yearly") → "invalidBillingPeriods"

Provide the full TypeScript Zod schema code.
```


Assumptions made:
- We should have enum values for paymentMethod to avoid incorrect paymentMethods passed into the system. 

### Repository 

Repository holds mocked data functions that allow to read data from JSON instead of DB source, but logically it would work the same with DB.
The only issue I have had with my mocked .save() and .getAll() functions is that JSON number preserves a shortest number it can find during serialization, therefore prices formatted from 100.0 to 100. It wouldn't be an issue if recurringPrice was a string instead of number. I have decided to leave it this way, because my main purpose with repository was to show-case read-write part and it does not affect on the modernisation of the code in general.