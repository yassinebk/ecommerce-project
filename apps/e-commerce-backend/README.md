# Project Structure 

## The complete flow: 

### Authentication and Authorization : 
- Went for the access token , refresh token approach for more security. The access token is the one that identifies the client and the refresh token is to make sure that the client has the option to logout from all accounts.

- /refresh-token to get new tokens. An expired refresh token leads to logout.

### Admin view

- The admin can edit the order from pending to either -> canceled or succeded
- The admin can add product , by adding a product the admin will add `GenericProduct` and then he can add the different sizes and colors which wll be labeled `ProductVariant` class.
    > genericProduct 1 --------------------- * productVariant
- The admin can edit all the previous ones


### Client view

!!! WARNING IT MIGHT BE SO EXPENSIVE IN TERM OF PERFORMANCE !!!

- The client add products in its cart and then we handle all the order. This approach is complicated as we will be awaiting for a big request when the client confirms its order... We have to:
1. Create the `Order` in the database.
2. Create the `orderProduct` with their quantities
3. Updates the quantities on the concerned `ProductVariants`
4. Saves and return the order into the request.









# Description

[Nest](https://github.com/nestjs/nest) Project.

## Installation

```bash

$ npm install

```

## Connecting Database

```bash
# if not connected
$ pscale login 
$ pscale connect database

```

- Set DATABASE_URL to connect to remote database ( production-wise )

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


