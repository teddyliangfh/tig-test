import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://fe-coding-test-o6yezgstiq-km.a.run.app/graphql',
    headers: {
        'x-token': 'fe-test-2023',
      },
    name: 'react-web-client',
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

export default client;
