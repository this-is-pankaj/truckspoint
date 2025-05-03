import { logUserIn, signUserUp } from "../actions/auth";
import LoginFormWrapper from "./_components/LoginFormWrapper/LoginFormWrapper";
import { LoginFormSchema, SignupFormSchema } from "./_components/schema.zod";

const LoginPage = () => {
  const randomId = Math.random().toString(36).substring(2, 15);
  
  const handleLogin = async (formData: LoginFormSchema) => {
    "use server";
    const res = await logUserIn(formData)
    if (res) {
      console.log("Login successful", res)
      // handle success
    } else {
      console.log("Login failed")
      // handle failure
    }
  }

  const handleSignup = async (formData: SignupFormSchema) => {
    "use server";
    const res = await signUserUp(formData)
    if (res) {
      console.log("Signup successful", res)
      // handle success
    } else {
      console.log("Signup failed")
      // handle failure
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-start h-screen">
      <LoginFormWrapper onLogin={handleLogin} onSignup={handleSignup} salt={randomId} />
    </div>
  );
}
export default LoginPage;