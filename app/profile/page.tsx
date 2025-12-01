"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { logout, user , status, } = useAuth();
    const {wallet} =useWallet();
    if(status === "logged-out"){
        redirect("/")
        return
    }
    if (status === "in-progress") {
    return <div>Loading...</div>;
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-10 w-full">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 underline">Profile</h1>

        <div className="flex gap-3 mb-8">
          <button className="px-4 py-2 text-xs font-medium border rounded-xl">ASSETS</button>
          <button className="px-4 py-2 text-xs font-medium rounded-xl bg-yellow-400 text-black shadow-sm">ACCOUNT DETAILS</button>
        </div>

        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <p className="text-gray-400">Paymail</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-medium">{user?.email}</p>
              <span className="cursor-pointer">📋</span>
            </div>
          </div>

          <div>
            <p className="text-gray-400">Address</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-medium">{wallet?.address}</p>
              <span className="cursor-pointer">📋</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-medium">Developer tools</p>
            <Switch defaultChecked />
            <p className="text-xs">ON</p>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Button onClick={logout} className="w-40 h-12 rounded-full bg-red-200 text-red-800 hover:bg-red-300">Logout</Button>
        </div>
      </div>
    </div>
  );
}
