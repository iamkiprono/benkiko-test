"use client"
import React from 'react'
import { useAuth } from "@crossmint/client-sdk-react-ui";

const UserCard = () => {
  const { login, logout, user, jwt } = useAuth();

  return (
    <div>
         {!user &&  <button 
         onClick={login}
        className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition rounded-full">
          Sign In
        </button>}
        {user &&

            <button onClick={logout} className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition rounded-full">
           {user?.email}
        </button>
        }
    </div>
  )
}

export default UserCard