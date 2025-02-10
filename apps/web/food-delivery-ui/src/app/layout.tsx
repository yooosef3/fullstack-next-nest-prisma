import '@mantine/core/styles.css';
import './globals.css';
import { MantineProvider as MantineUIProvider } from "./providers/mantine";

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export const metadata = {
  title: 'Food Delivery',
  description: 'Food Delivery App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <MantineUIProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MantineUIProvider>
      </body>
    </html>
  );
}
