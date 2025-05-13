'use client';
import { PropsWithChildren } from "react";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import SideNavbar from "./components/SideNavbar/SideNavbar";

type AppNavigationBarProps = {
  isAuthenticated: boolean;
} & PropsWithChildren;

const AppNavigationBar = ({ children, isAuthenticated }: AppNavigationBarProps) => {
  console.log('isAuthenticated', isAuthenticated);
  return (
    !isAuthenticated
      ? <TopNavbar appLinks={[]}>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          {children}
        </div>
      </TopNavbar>
      : <SideNavbar>
        {children}
      </SideNavbar>
  )
}

export default AppNavigationBar;