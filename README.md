# Back End Engineering Challenge -- Change

Node.js RESTful API application simulating till behavior.

## Run locally
Requires [Node.js](http://nodejs.org/).
```sh
$ git clone https://github.com/LostLucidity/Back-End-Engineering-Challenge----Change.git
$ cd node-rest-till
$ npm install
$ npm start
```
## Testing
```sh
$ npm test
```

## Instructions while running.
- Visit localhost:3000 for fallback port.
- Recommend using Postman for API testing.

- The following actions can be access under the resource endpoint /api/till:
  - GET
    - Returns the current till object with the counts and total value of the coins.
  - PUT
    - Replaces the current till values with a json submitted object. If no coins are submitted, the value set is 0.
  - PATCH
    - Updates coin counts specified from json submitted object. If no coins are submitted, the value is unchanged.
  - POST
    - Returns the minimum amount of coins needed to return to the user from they json submitted object.

JSON object examples for PUT and PATCH:
 ```
{
    "quarters": 3,
    "dimes": 10,
    "nickels": 3,
    "pennies": 9
}
  ```
JSON object examples for POST:
```
{
  "value": 1.99
}
```

# TODO
Validate non-numbered entries. Reject strings that cannot be converted to numbers.

# Interesting notes
Adding decimals would sometimes result in float values that would fail unit tests. Workaround to this was to multiply values by 100 to avoid decimals until the end of the calfulation where it would be divided by 100.

## References Used:
- For Express setup: https://www.youtube.com/watch?v=-3vvxn78MH4
- For Unit Testing setup: https://www.youtube.com/watch?v=I4BZQr-5mBY



