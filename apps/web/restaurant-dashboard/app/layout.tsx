import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import LayoutProvider from './providers/providers';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
