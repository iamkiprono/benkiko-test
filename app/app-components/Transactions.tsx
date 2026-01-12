"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import clsx from "clsx";
import { act, useEffect, useState } from "react";
import UserCard from "../app-components/UserCard";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowDownRight, ArrowUp, CheckCircle2, Clock, Loader2Icon, Send, XCircle, Copy } from "lucide-react";
import { Transactionz } from "../types/types";
import Link from "next/link";
import { toast } from "sonner"

// Define types for transaction structure
interface Transaction {
    id: string;
    status: string;
    createdAt: string;
    chainType: string;
    walletType: string;
    sendParams: {
        token: string;
        params: {
            amount: string;
            recipient: string;
        };
    };
    onChain: {
        txId: string;
        explorerLink: string;
    };
}



type Events = {
    token_symbol: string;
    transaction_hash: string;
    to_address: string;
    from_address: string;
    timestamp: number;
    amount: string;
    type: string;
}

interface Activity {
    events: Events[];
}

export default function TransactionsPage() {
    const { wallet, status } = useWallet();

    const [transactions, setTransactions] = useState<Transactionz[] | null>(null);
    const [selected, setSelected] = useState<Transactionz | null>(null)
    const [activity, setActivity] = useState<Activity | null>(null);
  const [copied, setCopied] = useState(false);
        const [value, setValue] = useState('');



    const getWalletTransactions = async (walletLocator: string) => {
        if (!walletLocator) return;

        try {
            console.log(`Getting transactions for: ${walletLocator}`)
            const response = await fetch(`/api/transactions?wallet=${walletLocator}`);
            const data = await response.json();

            console.log({ data });

            if (data?.transactions) {
                setTransactions(data.transactions as Transactionz[]);
                setSelected(data.transactions[0])
            }
        } catch (error) {
            console.error(error);
        }
    };


    const getStatusIcon = (status: string) => {
        if (status === "failed")
            return <XCircle className="text-red-500 w-12 h-12 mb-4" />
        if (status === "awaiting-approval")
            return <Clock className="text-yellow-500 w-12 h-12 mb-4" />
        return <CheckCircle2 className="text-green-500 w-12 h-12 mb-4" />
    }

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-KE", {
            dateStyle: "medium",
            timeStyle: "short",
        })

    const fetchTransactions = async () => {
        try {
            const activity = await wallet?.experimental_activity()
            setActivity(activity as Activity);
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    }


    useEffect(() => {
        getWalletTransactions(wallet?.address ?? "");
        fetchTransactions();
    }, [status]);

    if (transactions && transactions?.length === 0) {
        return (
            <div className="p-6 bg-yellow-50 min-h-screen flex items-center justify-center w-full relative">

                <p className="text-yellow-700 text-xl font-semibold">
                    No transactions available.
                </p>
            </div>
        );
    }

    if (!transactions) {
        return <div className="flex justify-center">
            <div className="animate-spin">
                <Loader2Icon />
            </div>
        </div>
    }

    if (!selected) {
        return <div>Not selected yet</div>
    }

    const formatAddress = (addr: string) => {
        if (!addr) return "";
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const formatTimestamp = (ts: number) => {
        return new Date(ts).toLocaleString();
    };

    const walletAddress = wallet?.address || "";


    return (
        <div className="flex w-full min-h-screen bg-white text-gray-900">
            {/* Transactions List */}
            <div className="flex-1 border-r border-gray-100 p-8 overflow-y-auto">
           
                <h2 className="text-2xl font-semibold mb-6">Transactions</h2>
 
      
                <div className="space-y-4">
                    {/* {transactions.map((tx) => (
                        <Card
                            key={tx.id}
                            onClick={() => setSelected(tx)}
                            className={clsx(
                                "flex items-center justify-between px-4 py-3 transition cursor-pointer",
                                selected?.id === tx?.id ? "bg-gray-100" : "hover:bg-gray-50"
                            )}
                        >
                            <div>
                                <div className="flex gap-2">

                                    <p className="font-medium">{tx?.sendParams?.params?.amount}</p>
                                    <p className="font-medium text-gray-500"> {tx?.sendParams?.token}</p>
                                </div>
                                <p
                                    className={clsx("text-sm", {
                                        "text-green-600": tx.status === "completed",
                                        "text-yellow-600": tx.status === "awaiting-approval",
                                        "text-red-600": tx.status === "failed",
                                    })}
                                >
                                    {tx.status.replace("-", " ")}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                {formatDate(tx.createdAt)}
                            </span>
                        </Card>
                    ))} */}
                    {activity?.events.map((event, index: number) => {
                        const isIncoming =
                            walletAddress &&
                            event.to_address?.toLowerCase() === walletAddress.toLowerCase();

                        return (
                            <Card
                                key={`${event.transaction_hash}-${index}`}
                                className={`border ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } shadow-sm`}
                            >
                                <CardContent className="flex justify-between items-center py-4">
                                    {/* LEFT SIDE */}
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncoming
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {isIncoming ? (
                                                <ArrowDown size={16} />
                                            ) : (
                                                <ArrowUp size={16} />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-col">
                                            {/* Header */}
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    {isIncoming ? "Received" : "Sent"}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatTimestamp(event.timestamp)}
                                                </span>
                                            </div>

                                            {/* Address */}
                                            <span className="text-gray-600 text-sm">
                                                {isIncoming
                                                    ? `From ${formatAddress(event.from_address)}`
                                                    : `To ${formatAddress(event.to_address)}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className="text-right">
                                        {/* copy transaction hash button */}
                                     <CopyToClipboard
                                            text={event.transaction_hash}
            onCopy={() => {setCopied(true)
            toast.success("Transaction hash copied")}
        }    
                                        ><Copy /> 
                                            </CopyToClipboard>
                                        <span
                                            className={`text-lg font-semibold ${isIncoming ? "text-green-600" : "text-blue-600"
                                                }`}
                                        >
                                            {isIncoming ? "+" : "-"}${event.amount}
                                        </span>
                                        <div className="text-sm text-gray-500">
                                            {event.token_symbol}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Transaction Details */}
            {/* <div className="w-[35%] bg-gray-50 p-10 flex flex-col items-center overflow-y-auto">
                {getStatusIcon(selected?.status)}

                <h2
                    className={clsx("text-2xl font-semibold mt-1", {
                        "text-green-600": selected.status === "completed",
                        "text-yellow-600": selected.status === "awaiting-approval",
                        "text-red-600": selected.status === "failed",
                    })}
                >
                    {selected.sendParams?.params?.amount} {selected.sendParams?.token}
                </h2>

                <p className="text-gray-500 text-sm mb-6 capitalize">
                    {selected.status.replace("-", " ")}
                </p>

                <div className="flex gap-4 mb-8">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send again
                    </Button>
                    <Button variant="secondary" className="shadow flex items-center gap-2">
                        <ArrowDownRight className="w-4 h-4" /> Request
                    </Button>
                </div>

                <Card className="w-full max-w-sm">
                    <CardContent className="pt-6 space-y-4 text-sm">
                        <div>
                            <p className="text-gray-500">Transaction hash</p>
                            <p className="break-all text-xs font-mono">
                                {selected.onChain?.userOperationHash || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Created at</p>
                            <p>{formatDate(selected.createdAt)}</p>
                        </div>

                        {selected.completedAt && (
                            <div>
                                <p className="text-gray-500">Completed at</p>
                                <p>{formatDate(selected.completedAt)}</p>
                            </div>
                        )}

                        {selected.sendParams?.params?.recipient && (
                            <div>
                                <p className="text-gray-500">Recipient</p>
                                <p className="break-all">
                                    {selected.sendParams.params.recipient}
                                </p>
                            </div>
                        )}

                        {selected.error?.message && (
                            <div>
                                <p className="text-gray-500">Error</p>
                                <p className="text-red-600">{selected.error.message}</p>
                            </div>
                        )}

                        {selected.approvals?.submitted?.length > 0 && (
                            <div>
                                <p className="text-gray-500">Approved by</p>
                                <p>{selected.approvals.submitted[0].signer.email}</p>
                            </div>
                        )}

                        {selected.approvals?.pending?.length > 0 && (
                            <div>
                                <p className="text-gray-500">Awaiting approval from</p>
                                <p>{selected.approvals.pending[0].signer.email}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div> */}
        </div>
    );
}
