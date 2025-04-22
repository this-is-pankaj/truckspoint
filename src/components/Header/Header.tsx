import Image from "next/image";
import { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow sticky top-0 z-10">
      <div className="flex items-center">
        <Image src="/tp_logo.svg" alt="Truckspoint Logo" className="h-10 mr-2" width={50} height={50} />
      </div>
      {children}
    </header>
  );
}

export default Header;