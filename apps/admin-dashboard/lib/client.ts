// export const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000/graphql",

//   ssrMode: true,
//   cache: new InMemoryCache(),
// });

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { redirect } from "next/dist/server/api-utils";

let apolloClient;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000/graphql",
});

const authLink = setContext((request, { headers }) => {
  let token;

  if (request.operationName === "RefreshToken") {
    token = localStorage.getItem("refresh_token");
  } else token = localStorage.getItem("access_token");
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const getNewToken = () => {
  return apolloClient
    .query({
      query: gql`
        query RefreshToken($refreshTokenInput: UpdateUserRefreshTokenInput!) {
          refreshToken {
            access_token
            refresh_token
          }
        }
      `,
    })
    .then((response) => {
      // extract your accessToken from your response data and return it
      const { access_token } = response.data;
      return access_token;
    });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return fromPromise(
              getNewToken().catch((error) => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token");
                redirect(null,"/login");
                return;
              })
            ).flatMap((accessToken) => {
              console.log(accessToken);
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });

              return forward(operation);
            });
        }
      }
    }
  }
);

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  ssrMode: true,
  cache: new InMemoryCache(),
});


export default apolloClient
