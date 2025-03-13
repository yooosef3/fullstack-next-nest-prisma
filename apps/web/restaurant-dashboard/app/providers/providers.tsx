'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import Sidebar from "@/shared/components/Sidebar";

const theme = createTheme({
  respectReducedMotion: false,
  primaryColor: 'cyan',
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </MantineProvider>
  );
}
