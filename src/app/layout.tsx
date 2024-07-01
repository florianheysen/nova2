"use client";

import { useLocalStorage } from "usehooks-ts";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";
import Login from "@/components/login";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isLoggedIn ? (
            <QueryProvider>{children}</QueryProvider>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
