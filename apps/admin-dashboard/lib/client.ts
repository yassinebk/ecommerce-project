import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000/graphql",

  ssrMode: true,
  cache: new InMemoryCache(),
});
