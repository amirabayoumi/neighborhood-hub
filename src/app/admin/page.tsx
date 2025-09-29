"use client";

import { login, selectIsLoggedIn } from "@/store/LoginSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
      dispatch(login(username));
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  if (isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">
          Redirecting to Admin Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <form
        onSubmit={handleLogin}
        className="flex flex-col max-w-sm mx-auto mt-10"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mt-2 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="mt-4 bg-very-dark-green text-white p-2 rounded-md"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </main>
  );
};

export default Page;
