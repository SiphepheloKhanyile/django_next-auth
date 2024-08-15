import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "./AppBar";
import { cn } from "@/lib/utils";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased h-screen",
          inter.variable
        )}
      >
        <AppBar />
        {children}
      </body>
    </html>
  );
}
