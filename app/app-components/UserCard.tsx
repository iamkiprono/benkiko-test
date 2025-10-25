"use client"
import React from 'react'
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { Button } from '@/components/ui/button';
import MenuBar from './MenuBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2Icon } from 'lucide-react';

const UserCard = () => {
  const { login, logout, user, jwt, status } = useAuth();

  if (status === "initializing") {
    return <>
      <Loader2Icon className="animate-spin" />
    </>
  }

  return (
    <div>
      {!user && <Button
        onClick={login}

        className="bg-yellow-500 text-white ">
        {status !== "logged-out" ? "Loading..." : "Sign In"}
      </Button>}
      {user &&
        (
          <div className='flex gap-2'>
            <MenuBar>
              <Avatar>
                <AvatarImage src="/avatars/matt.png" alt="matt" />
                <AvatarFallback>{user.email?.split("")[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </MenuBar>
            <Button className="bg-[var(--color-accent)] ">
              {user?.email}
            </Button>
          </div>

        )
      }
    </div>
  )
}

export default UserCard