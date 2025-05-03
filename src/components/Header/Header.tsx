import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow sticky top-0 z-10 bg-dark">
      <div className="flex items-center">
        <Link href='/'>
          <Image src="/tp_logo.svg" alt="Truckspoint Logo" className="h-10 mr-2" width={50} height={50} />
        </Link>
      </div>
      {children}
    </header>
  );
}

export default Header;