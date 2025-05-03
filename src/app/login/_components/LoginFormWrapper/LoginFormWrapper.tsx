'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { cn } from "@/lib/utils";
import SignupForm from "../SignUpForm/SignupForm";

type LoginFormWrapperProps = {
  salt: string;
}

const LoginFormWrapper = ({ salt }: LoginFormWrapperProps) => {
  const [isLoginFromActive, setIsLoginFormActive] = useState(true)

  return (
    <div className="shadow-md p-8 bg-white rounded-md flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        <Button variant='ghost' className={cn(
          'cursor-pointer hover:text-primary-foreground hover:bg-transparent rounded-none',
          { 'border-b border-primary-foreground text-primary-foreground': isLoginFromActive }
        )}
          onClick={() => setIsLoginFormActive(true)}
        >
          Login
        </Button>
        <Button variant='ghost' className={cn(
          'cursor-pointer hover:text-primary-foreground hover:bg-transparent rounded-none',
          { 'border-b border-primary-foreground text-primary-foreground': !isLoginFromActive }
        )}
          onClick={() => setIsLoginFormActive(false)}
        >
          Sign up
        </Button>
      </div>
      <div className={cn("shadow p-4 transition-all duration-300", {
        'md:w-80': isLoginFromActive,
        'md:w-xl': !isLoginFromActive,
      })}>
        {
          isLoginFromActive
            ? < LoginForm />
            : <SignupForm />
        }
      </div>
    </div>
  )
}

export default LoginFormWrapper;