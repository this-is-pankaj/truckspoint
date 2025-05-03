import LoginFormWrapper from "./_components/LoginFormWrapper/LoginFormWrapper";

const LoginPage = () => {
  const randomId = Math.random().toString(36).substring(2, 15);

  return (
    <div className="flex flex-col gap-4 items-center justify-start h-screen">
      <LoginFormWrapper salt={randomId} />
    </div>
  );
}
export default LoginPage;