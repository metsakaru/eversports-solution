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

### Showcase of PR and commits

I thought it would be also a good idea to show-case a minimalistic example how would potential PR and commit messages look like working on similar task in real-life.

https://github.com/metsakaru/eversports-solution/pull/1
https://github.com/metsakaru/eversports-solution/pull/1/commits

### Testing

For automated testing I've picked Jest library based on ts-jest preprocessor. I've added couple of automated tests around utils functions as the beginning to ensure business logic is being covered with basic simple tests first.

For correctness of API response I've added supertest library on top of Jest that would be able to execute API and validate the data. As we use static source of data I haven't add any mocks to create data before we validate it and just validate statically first available object in JSON file that it is returned as it is saved in JSON.

```sh
npm test
```

What I would do if I have allocated more time for testing? Definetely a bunch of things. I'm not happy with testing that is done here it does not provide much of the value, but it does provide a way how we can potentially get some value from automated testing. I would definetely add more tests around utils functions and it's negative as long as edge cases should be covered. Additionally I would definetely add some contract tests done via [Pact.io](https://docs.pact.io/) to ensure correctness of API response and it's types. Being cautios of time allocated for this I've purposefully just showed how tests would look alike. 