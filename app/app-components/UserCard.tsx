"use client"
import React from 'react'
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { Button } from '@/components/ui/button';
import MenuBar from './MenuBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Loader2Icon, User2 } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';


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
            {/* <MenuBar>
              <Avatar>
                <AvatarImage src="/avatars/matt.png" alt="matt" />
                <AvatarFallback>{user.email?.split("")[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </MenuBar> */}
            {/* <Link href={"/profile"}>
            <Button className="bg-[var(--color-accent)] ">
              {user?.email}
            </Button>
            </Link> */}

               <DropdownMenu >
                <DropdownMenuTrigger asChild className="bg-[var(--color-accent)]">
                  <SidebarMenuButton>
                    <User2 /> {user?.email}
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                   <Link href={"/profile"}>
                  <DropdownMenuItem>
                    <span>
                     Profile
                    </span>
                  </DropdownMenuItem>
                  </Link>
                  {/* <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={logout}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>

        )
      }
    </div>
  )
}

export default UserCard