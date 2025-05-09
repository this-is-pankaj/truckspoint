import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Navigations from "@/components/Navigations/Navigations";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/SideBarNavigation/SideBarNavigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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
        <SidebarProvider>
          {/* <Header> */}
          {/* <NavigationBar>
            <Navigations links={appLinks} />
          </NavigationBar> */}
          {/* <NavigationMenu>
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent p-0 text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:hover:text-white data-[state=open]:hover:bg-transparent" >
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-dark px-4 py-2">
                  <ul className="">
                    <NavigationMenuLink href="/login" title="Login or Signup" className={cn(navigationMenuTriggerStyle(), 'text-white bg-transparent transition-colors duration-300 hover:bg-transparent hover:text-logo-color text-base')}>
                      Signup/ Login
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Header> */}
          <AppSidebar />
          {/* <main className="p-8 flex flex-col h-screen">
          {children}
        </main> */}
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
