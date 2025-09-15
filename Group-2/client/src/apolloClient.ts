import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: backendUrl,
    fetchOptions: {
      cache: 'no-cache'  // Luôn lấy data mới
    }
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'  // Luôn lấy data mới
    },
    query: {
      fetchPolicy: 'no-cache'  // Luôn lấy data mới
    }
  }
});

