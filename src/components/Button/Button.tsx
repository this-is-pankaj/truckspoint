import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;