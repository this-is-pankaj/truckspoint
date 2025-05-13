import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalStoreProvider } from "./(shared)/_providers/globalStore/providers";
import AppNavigationBar from "@/components/AppNavigationBar/AppNavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truckspoint",
  description: "manage your fleet with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appLinks = [
    { name: "Clients", href: "/clients" },
    { name: "Tenants", href: "/tenants" },
  ]
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <GlobalStoreProvider tenants={[]}>
          <AppNavigationBar isAuthenticated={false}>
            {children}
          </AppNavigationBar>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
