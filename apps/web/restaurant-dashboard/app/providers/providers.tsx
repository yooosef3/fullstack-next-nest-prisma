'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import Sidebar from "@/shared/components/Sidebar";
import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';

const theme = createTheme({
  respectReducedMotion: false,
  primaryColor: 'cyan',
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8" suppressHydrationWarning>
            {children}
          </main>
        </div>
      </MantineProvider>
    </ApolloProvider>
  );
}
