"use client"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { useEffect, useState } from "react";

const mockData = {
    "transactions": [
        {
            "chainType": "evm",
            "walletType": "smart",
            "sendParams": {
                "token": "USDT",
                "params": {
                    "amount": "1000",
                    "recipient": "0x789..."
                }
            },
            "id": "txn123",
            "status": "awaiting-approval",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "onChain": {
                "txId": "0xtxid...",
                "explorerLink": "https://explorer.io/tx/0xtxid"
            }
        }
    ]
};



export default function TransactionsPage() {
    // const { transactions } = mockData;
    const { wallet, status } = useWallet();


    const [transactions, setTransactions] = useState<any>([])

    const getWalletTransactions = async (walletLocator: string) => {


        const url = `https://staging.crossmint.com/api/2025-06-09/wallets/${walletLocator}/transactions`;

        try {
            const response = await fetch(url, { method: 'GET', headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "" } });
            const data = await response.json();
            console.log({data});
            setTransactions(data.transactions)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getWalletTransactions(wallet?.address)
    }, [status])


    if (!transactions || transactions.length === 0) {
        return (
            <div className="p-6 bg-yellow-50 min-h-screen flex items-center justify-center w-full">
                <p className="text-yellow-700 text-xl font-semibold">No transactions available.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-yellow-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-yellow-700 mb-6">Transactions</h1>
            <div className="space-y-4">
                {transactions.map((txn) => (
                    <Card key={txn.id} className="border-yellow-300 shadow-sm hover:shadow-md transition p-4 flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{txn.sendParams.params.amount} {txn.sendParams.token}</p>
                            <p className="text-sm text-gray-600">Recipient: {txn.sendParams.params.recipient}</p>
                            <p className="text-sm text-gray-600">Created: {new Date(txn.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="capitalize bg-yellow-500 text-white">{txn.status.replace('-', ' ')}</Badge>
                            <Button asChild size="sm" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                <a href={txn.onChain.explorerLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-1" /> View
                                </a>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}