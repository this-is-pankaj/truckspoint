import { logUserIn } from "../actions/auth";
import LoginFormWrapper from "./_components/LoginFormWrapper/LoginFormWrapper";

const LoginPage = () => {
  const randomId = Math.random().toString(36).substring(2, 15);
  
  const handleLogin = async (formData: any) => {
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
  return (
    <div className="flex flex-col gap-4 items-center justify-start h-screen">
      <LoginFormWrapper onLogin={handleLogin} salt={randomId} />
    </div>
  );
}
export default LoginPage;