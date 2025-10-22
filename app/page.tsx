"use client";

import { useAuth } from "@crossmint/client-sdk-react-ui";


export default function AuthButton() {
  const { login, logout, user, jwt } = useAuth();
  const { wallet, status } = useWallet();


  console.log({ user, status })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 w-full relative">
      <div className="absolute top-6 right-6 ">
        {/* <UserCard/> */}
       {user && <UserCard/>}
      </div>
      {!user && status ==="not-loaded" ? <UserCard/> :
        <Home  />
      }

    </div>
  );
}

import { useWallet } from "@crossmint/client-sdk-react-ui";
import { Loader2Icon } from "lucide-react";
import Home from "./app-components/Home";
import UserCard from "./app-components/UserCard";

export function Wallet() {
  const { wallet, status } = useWallet();

  if (status === "in-progress") {
    return <div>Loading...</div>;
  }

  if (status === "loaded" && wallet) {
    return <div>Connected: {wallet.address}</div>;
  }

  return <div>Wallet not connected</div>;
}


