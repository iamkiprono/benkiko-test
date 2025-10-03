"use client";

import { useAuth } from "@crossmint/client-sdk-react-ui";
import Link from "next/link"


export default function AuthButton() {
  const { login, logout, user, jwt } = useAuth();


  console.log({user})

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          {user == null ? (
            <button
              type="button"
             
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow transition-all duration-300"
            >
              Login
            </button>
          ) : (
            <>
            <button
              type="button"
              onClick={logout}
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-xl border-2 border-blue-600 shadow transition-all duration-300"
            >
                              Logout
            </button>
            <Link href={"/wallet"}>Wallet</Link>

</>
          )}
        </div>
        

        {user && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800">User Details</h2>
            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-semibold">User ID:</span> {user.id}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {user.email ?? "None"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {user.phoneNumber ?? "None"}
              </p>
              <p>
                <span className="font-semibold">Farcaster:</span>{" "}
                {user.farcaster?.username ?? "None"}
              </p>
            
            </div>
          </div>
        )}

        {jwt && (
          <div className="bg-gray-100 p-3 rounded-lg overflow-auto text-sm text-gray-700">
            <span className="font-semibold">JWT:</span> {jwt}
          </div>
        )}
 <Wallet/>
      </div>
    </div>
  );
}

import { useWallet } from "@crossmint/client-sdk-react-ui";

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


