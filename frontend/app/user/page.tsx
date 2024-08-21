"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { User } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/interfaces";

const Page = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserInfo>();

  const fetchUserProfile = async () => {
    console.log(session);
    console.log(session?.user.accessToken);

    const userToken = session?.user.accessToken;

    const res = await fetch(`http://localhost:3000/api/info/`, {
      method: "POST",
      body: JSON.stringify({userToken}),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data: UserInfo = await res.json();
    console.log(data);
    setUserData(data);
  };

  return (
    <div className="px-10">
      <p className="flex justify-center items-center p-5 text-sky-500 text-lg font-bold">This is user Panel</p>
      <Button onClick={fetchUserProfile}>Get User Profile</Button>
      <div className="grid grid-cols-5">
        <p className="text-slate-600">UserName:</p>
        <p className="col-span-4 text-sky-600">{userData?.username}</p>
        <p className="text-slate-600">Email:</p>
        <p className="col-span-4  text-sky-600">{userData?.email}</p>
        <p className="text-slate-600">Role:</p>
        <p className="col-span-4  text-sky-600"> {userData?.role}</p>
      </div>
    </div>
  );
};

export default Page;
