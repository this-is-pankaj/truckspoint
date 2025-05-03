import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
      <p>Welcome to Truckspoint. We help your business keep moving...</p>
      <p className="flex gap-1">
      <Link href='/login'>Login now</Link> to get started.
      </p>
    </div>
  );
}
