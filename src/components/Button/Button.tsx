import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'transparent' | 'outline';
  text?: 'xl' | 'base' | 'sm';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles = {
  primary: 'bg-blue-500 hover:bg-blue-700',
  secondary: 'bg-gray-500 hover:bg-gray-700',
  danger: 'bg-red-500 hover:bg-red-700',
  outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  transparent: 'bg-transparent text-gray-700 hover:bg-gray-200 border border-gray-300 hover:text-gray-900',
};

const textSizeClasses = {
  xl: 'text-xl',
  base: 'text-base',
  sm: 'text-sm',
};
const Button = ({ className, children, variant = 'primary', text = 'base' }: ButtonProps) => {
  
  const variantClass = variantStyles[variant];
  const baseClass = 'text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const textSizeClass = textSizeClasses[text];
  const combinedClass = cn(baseClass, variantClass, textSizeClass, className);
  return (
    <button
      className={combinedClass}
    >
      {children}
    </button>
  );
}

export default Button;