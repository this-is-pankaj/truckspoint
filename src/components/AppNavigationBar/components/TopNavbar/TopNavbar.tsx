import Header from "@/components/Header/Header";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Navigations from "@/components/Navigations/Navigations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

type TopNavbarProps = {
  appLinks: {
    name: string;
    href: string;
  }[];
} & PropsWithChildren;

const TopNavbar = ({ children, appLinks }: TopNavbarProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Header>
        <NavigationBar>
          <Navigations links={appLinks} />
        </NavigationBar>
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
      </Header>
      <main className="p-8 flex flex-col h-screen">
        {children}
      </main>
    </div>
  )
}

export default TopNavbar;