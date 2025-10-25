"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@crossmint/client-sdk-react-ui"
import { useState } from "react"
import { toast } from "sonner"
import UserCard from "../app-components/UserCard"
export default function Transact() {

  const { wallet: crossmintWallet } = useWallet()

  const [tab, setTab] = useState<"send" | "receive">("send")
  const [wallet, setWallet] = useState(crossmintWallet?.address || "")
  const [token, setToken] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
const [loading, setLoading] = useState(false);
  const transferToken = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletLocator: crossmintWallet?.address,
          tokenLocator: `chain:currency:${token}`,
          recipient,
          signer: crossmintWallet?.address,
          amount,
          memo: { type: "text", value: "Hello, world!" },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message || 'Transfer failed');
      }

      toast.success('Transfer successful!');
    } catch (error) {
      setLoading(false);
      toast.error(`Transfer failed: ${(error as Error).message}`);
    }
  }



  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen w-full ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transact</h1>

        <div className="flex items-center gap-3">
          {/* <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Zap className="text-yellow-600" size={18} />
            </div>
            <Avatar>
              <AvatarImage src="/avatars/matt.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          </div> */}
          <UserCard />
        </div>
      </div>

      {/* Send / Receive Tabs */}
      {/* <div className="flex gap-3">
        <Button
          className={`rounded-full px-6 py-2 font-semibold ${tab === "send" ? "bg-yellow-400 text-black" : "bg-gray-100"
            }`}
          onClick={() => setTab("send")}
        >
          SEND
        </Button>
        <Button
          className={`rounded-full px-6 py-2 font-semibold ${tab === "receive" ? "bg-yellow-400 text-black" : "bg-gray-100"
            }`}
          onClick={() => setTab("receive")}
        >
          RECEIVE
        </Button>
      </div> */}

      {/* Form */}
      <Card className="w-full max-w-xl p-6 rounded-2xl shadow-sm bg-white mx-auto">
        <CardContent className="space-y-6">
          {/* Wallet Locator */}
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet Locator (Address, Email, or Phone)</Label>
            <Input
              id="wallet"
              placeholder="e.g. 0x23A5... or user@example.com or +254712345678"
              value={crossmintWallet?.address}
              onChange={(e) => setWallet(e.target.value)}
              className="py-6 text-base"
              disabled={!!crossmintWallet?.address}
            />
          </div>

          {/* Token Locator */}
          <div className="space-y-2">
            <Label>Token Locator</Label>
            <Select onValueChange={setToken}>
              <SelectTrigger className="py-6 text-base">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usdt">USDT</SelectItem>
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="bnb">BNB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Locator */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Locator</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient ID or reference"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="py-6 text-base"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="py-6 text-base pr-20"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute right-2 top-2 bg-yellow-100 text-yellow-800 rounded-full"
                onClick={() => setAmount("1000")}
              >
                Max
              </Button>
            </div>
            <p className="text-xs text-gray-500">Balance = 12,500.00 KSH</p>
          </div>

          {/* Send Button */}
          <Button disabled={!crossmintWallet?.address || loading} onClick={() => transferToken()} className="w-full py-6 rounded-full bg-yellow-400  text-lg font-semibold hover:bg-yellow-500">
            {loading ? 'Processing...' : 'Send Tokens'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
