import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from '@crossmint/client-sdk-react-ui';
import React from 'react';

const MenuBar = ({ children }: { children: React.ReactNode }) => {
  const { login, logout, user, jwt, status } = useAuth();

    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className='w-fit'>
                <Button variant={"destructive"} onClick={logout} >Log Out</Button>
            </PopoverContent>
        </Popover>
    )
}

export default MenuBar