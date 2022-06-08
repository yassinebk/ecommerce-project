import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.API_URI);
export const client = new ApolloClient({
  uri: process.env.API_URI,
  ssrMode: true,
  cache: new InMemoryCache(),
});
