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
```

Additionally I added ts-node-dev library to make sure I see code changes on the fly without re-building the service. Therefore service start should be done via:

```sh
npm install
npx ts-node-dev --respawn --transpile-only src/index.ts
```

