'use client';

import { graphqlClient } from '@/graphql/gql.setup';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider as Provider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <Provider theme={theme}>
        {children}
      </Provider>
    </ApolloProvider>
  );
}
