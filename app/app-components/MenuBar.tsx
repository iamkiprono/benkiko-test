import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { ChevronUp, User2 } from 'lucide-react';
import Link  from 'next/link';
import React from 'react';

const MenuBar = ({ children }: { children: React.ReactNode }) => {
  const { login, logout, user, jwt, status } = useAuth();

    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className='w-fit'>
                 <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user?.email}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>
                      <Link href={"/profile"}>Profile</Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </PopoverContent>
        </Popover>
    )
}

export default MenuBar