import React from 'react'
import Logo from './logo'
import UserCard from './UserCard'
import Link from "next/link"

const Navbar = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <Link href={"/"}>
                <Logo />
            </Link>
            <Link href={"/transactions"} className="text-yellow-600 font-semibold hover:underline">Transactions</Link>
            
            <UserCard />
        </div>
    )
}

export default Navbar