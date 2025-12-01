"use client"
import { ArrowRightLeft, Calendar, ChevronUp, Contact, Home, Inbox, Search, Settings, Store, User, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@crossmint/client-sdk-react-ui"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Contact,
  },
  {
    title: "Swap",
    url: "/swap",
    icon: ArrowRightLeft,
  },
  {
    title: "Store",
    url: "/store",
    icon: Store,
  }

]



export function AppSidebar() {
  const { login, logout, user, jwt, status } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" text-lg font-bold flex gap-2 items-center space-x-2 p-2">
            <img src="Benkiko-logo 1.png" alt="" />
            Benkiko DAO
            </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
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
                  {/* <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={logout}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}