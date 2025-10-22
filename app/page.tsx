"use client";

import { useAuth } from "@crossmint/client-sdk-react-ui";
import Link from "next/link"


export default function AuthButton() {
  const { login, logout, user, jwt } = useAuth();
  const { wallet, status } = useWallet();


  console.log({ user, status })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 w-full relative">
      <div className="absolute top-6 right-6 ">
        {/* <UserCard/> */}
        Wallet: {wallet ? wallet.address : "Not connected"}
      </div>
      {!user && status ==="not-loaded" ? "User loading" :
        <Home walletAddress={wallet?.address} />
      }

    </div>
  );
}

import { useWallet } from "@crossmint/client-sdk-react-ui";
import UserCard from "./app-components/UserCard";
import Home from "./app-components/Home";

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


