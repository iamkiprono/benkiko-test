"use client"
import React from 'react'
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { Button } from '@/components/ui/button';

const UserCard = () => {
  const { login, logout, user, jwt } = useAuth();

  return (
    <div>
         {!user &&  <Button 
         onClick={login}
         
        className="bg-yellow-500 text-white ">
          Sign In
        </Button>}
        {user &&

            <Button onClick={logout} className="bg-[var(--color-accent)] ">
           {user?.email}
        </Button>
        }
    </div>
  )
}

export default UserCard