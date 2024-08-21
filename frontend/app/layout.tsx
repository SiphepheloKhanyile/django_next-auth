import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import AppBar from "@/components/AppBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next-Auth",
  description: "By Sphe",
};

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased h-screen",
          inter.variable
        )}
      >
        <Providers session={session}>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
