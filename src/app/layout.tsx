// src/app/layout.tsx

import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import AppWrapper from "./layout/AppWrapper";
import "./globals.css";


const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});


export const metadata: Metadata = {
  title: "FLOW | Demo",
  description: "FLOW | UI App wrAPPer Demo",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased`}
      >
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
