import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log('Using backend URL:', backendUrl);

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: backendUrl,
    fetchOptions: {
      cache: 'no-cache'
    }
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

