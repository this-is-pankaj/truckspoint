'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { cn } from "@/lib/utils";
import SignupForm from "../SignUpForm/SignupForm";

type LoginFormWrapperProps = {
  onLogin: (data: any) => void;
  salt: string;
}

const LoginFormWrapper = ({ onLogin, salt }: LoginFormWrapperProps) => {
  const [isLoginFromActive, setIsLoginFormActive] = useState(true)

  const handleLogin = async (formData: any) => {
    console.log("Form data from LoginWrapper", formData)
    // validate the form data and if all looks good, call the onSubmit function
    onLogin(formData)
  }
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
      <div className="shadow p-4">
        {
          isLoginFromActive
            ? <div className="md:w-80">
              <LoginForm onLogin={handleLogin}/>
            </div>
            : <div className="md:w-xl">
              <SignupForm />
            </div>
        }
      </div>
    </div>
  )
}

export default LoginFormWrapper;