'use client';

import { MenuIcon, XIcon } from "lucide-react";
import { ReactNode, useState } from "react";

type NavigationBarProps = {
  children: ReactNode;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const handleNavToggle = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <button className="md:hidden" onClick={handleNavToggle}>
        {
          isNavOpen
            ? <XIcon size={32} />
            : <MenuIcon size={32} />
        }
      </button>
      <nav className={`md:block md:static ${isNavOpen ? "block fixed h-full w-full top-20 left-0 overflow-auto bg-white z-10 p-4" : "hidden"}`}>
        { children }
      </nav>
    </div>
  )
}

export default NavigationBar;