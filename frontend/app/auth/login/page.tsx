"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import React from "react";
import { signIn } from "next-auth/react";

interface Props {
  searchParams?: {[key: string]: string | string[] | undefined};
}

function LoginPage({ searchParams }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    })
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      {searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
}

export default LoginPage;
