import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Navigations from "@/components/Navigations/Navigations";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    { name: "Home", href: "/" },
    { name: "Clients", href: "/clients" },
    { name: "Login", href: "/login" },
  ]
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Header>
          {/* <NavigationBar>
            <Navigations links={appLinks} />
          </NavigationBar> */}
          <NavigationMenu>
            <NavigationMenuList>
              {
                appLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link href={link.href} passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'text-white bg-transparent transition-colors duration-300 hover:bg-transparent hover:text-logo-color text-base')}>
                        {link.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))
              }
            </NavigationMenuList>
          </NavigationMenu>
        </Header>
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
