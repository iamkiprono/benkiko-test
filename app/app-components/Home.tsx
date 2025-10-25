"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Repeat, Send, Upload } from "lucide-react"
import UserCard from "./UserCard"
import React from "react"
import { getWalletBalance } from "../actions/actions"
import { WalletTypes } from "../types/types"
import { useWallet } from "@crossmint/client-sdk-react-ui"
import Link from "next/link"

const data = [
    { name: "1", value: 30000 },
    { name: "2", value: 45000 },
    { name: "3", value: 60000 },
    { name: "4", value: 80000 },
    { name: "5", value: 100000 },
    { name: "6", value: 70000 },
]

const transactions = [
    { name: "1 BTC", time: "Today 4:20AM", amount: "+ KSH 23,500.90", status: "Processing", avatar: "/avatars/01.png" },
    { name: "0.03 ETH", time: "14 Feb 2022 2:00PM", amount: "- KSH 5,700.00", status: "Complete", avatar: "/avatars/02.png" },
    { name: "Peter Farm", time: "12 Feb 2022 11:30PM", amount: "+ KSH 145,256.60", status: "Failed", avatar: "/avatars/03.png" },
    { name: "John Doe", time: "11 Feb 2022 11:30PM", amount: "+ KSH 230,500.00", status: "Complete", avatar: "/avatars/04.png" },
]




export default function Home({ walletAddress }: { walletAddress?: string }) {

    const [walletBalance, setWalletBalances] = React.useState<WalletTypes[] | null>(null);

    const { wallet, status } = useWallet();


    const getWalletData = async () => {
        console.log("Fetching wallet data for:", wallet?.address);
        const res = await fetch(`/api/wallet-balance?address=${wallet?.address}`);
        const data = await res.json();
        if (res.ok) {
            setWalletBalances(data.data);
        } else {
            // alert(data.error)
            console.error("Error fetching wallet balance:", data.error);
        }
    }


    React.useEffect(() => {
        if (status === "not-loaded") {

            return;
        } else {
            getWalletData();
        }
    }, [status]);





    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen w-full">
            {/* Top Section */}
            {/* WalletState: {walletAddress} */}<br/>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-gray-500 text-sm">Total Balance</p>
                    <h1 className="text-3xl font-bold">{!walletBalance ? "Loading..." : `${walletBalance[0]?.symbol} - ${walletBalance[0]?.amount}`} </h1>
                    <Badge className="mt-1 bg-green-100 text-green-700">+30%</Badge>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="default" className="bg-black text-white rounded-full">
                        Deposit
                    </Button>
                    <Button variant="default" className="bg-yellow-400 text-black rounded-full">
                        Withdraw
                    </Button>
                    <div className="flex items-center gap-2 ml-4">
                        <Avatar>
                            <AvatarImage src="/avatars/matt.png" alt="matt" />
                            <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>

            {/* Promo Card */}
            <Card className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-2xl shadow-md">
                <CardContent className="flex justify-between items-center p-6">
                    <div>
                        <h2 className="text-xl font-semibold">Powering your Digital Lifestyle</h2>
                        <div className="flex gap-3 mt-2 text-sm">
                            <Badge variant="secondary" className="bg-white/20">Ease of Use</Badge>
                            <Badge variant="secondary" className="bg-white/20">Utility</Badge>
                            <Badge variant="secondary" className="bg-white/20">Freedom</Badge>
                        </div>
                    </div>
                    <span className="font-semibold text-sm">Benkiko DAO</span>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                <ActionButton icon={<Download size={24} />} label="Deposit" active />
               <Link href={"/send"}>
                <ActionButton icon={<Send size={24} />} label="Send" />
               </Link>
               
                <ActionButton icon={<Repeat size={24} />} label="Request" />
                <ActionButton icon={<Upload size={24} />} label="Withdraw" />
            </div>

            {/* Growth + Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* Growth Chart */}
                {/* <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

                {/* Activity Table */}
                <Card className="rounded-2xl shadow-sm w-full" >
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.map((tx, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={tx.avatar} alt={tx.name} />
                                            <AvatarFallback>{tx.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{tx.name}</p>
                                            <p className="text-xs text-gray-500">{tx.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {tx.amount}
                                        </p>
                                        <StatusBadge status={tx.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function ActionButton({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <button
            className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition 
        ${active ? 'bg-black text-white' : 'bg-white shadow hover:bg-gray-100'}`}
        >
            {icon}
            <span className="text-sm mt-1">{label}</span>
        </button>
    )
}

function StatusBadge({ status }: { status: string }) {
    let color = "bg-gray-200 text-gray-700"
    if (status === "Processing") color = "bg-green-100 text-green-700"
    if (status === "Complete") color = "bg-emerald-100 text-emerald-700"
    if (status === "Failed") color = "bg-red-100 text-red-700"

    return <Badge className={`${color} text-xs`}>{status}</Badge>
}
