import Link from "next/link";

type NavigationProps = {
  links: {
    name: string;
    href: string;
  }[]
}

const Navigations = ({ links }: NavigationProps) => {
  return (
    <ul className="flex gap-4 flex-col md:flex-row items-center">
      {links.map((link) => (
        <li key={link.name} className="hover:text-blue-500 transition-colors duration-300">
          <Link href={link.href} className="block">{link.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigations;