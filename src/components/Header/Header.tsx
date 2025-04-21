import Image from "next/image";
import Navigations from "../Navigations/Navigations";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow">
      <div className="flex items-center">
        <Image src="/tp_logo.svg" alt="Truckspoint Logo" className="h-10 mr-2" width={50} height={50}/>
      </div>
      <Navigations />
    </header>
  );
}

export default Header;