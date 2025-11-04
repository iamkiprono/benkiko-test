"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import UserCard from "../app-components/UserCard";

import { CardContent } from "@/components/ui/card";
import { ArrowDownRight, CheckCircle2, Clock, Loader2Icon, Send, XCircle } from "lucide-react";
import { Transactionz } from "../types/types";

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

export default function TransactionsPage() {
    const { wallet, status } = useWallet();

    const [transactions, setTransactions] = useState<Transactionz[] | null>(null);
    const [selected, setSelected] = useState<Transactionz | null>(null)

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

    useEffect(() => {
        getWalletTransactions(wallet?.address ?? "");
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
                <Loader2Icon/>
            </div>
        </div>
    }

    if (!selected) {
        return <div>Not selected yet</div>
    }

    return (
        <div className="flex w-full min-h-screen bg-white text-gray-900">
            {/* Transactions List */}
            <div className="flex-1 border-r border-gray-100 p-8 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6">Transactions</h2>
                <div className="space-y-4">
                    {transactions.map((tx) => (
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
                    ))}
                </div>
            </div>

            {/* Transaction Details */}
            <div className="w-[35%] bg-gray-50 p-10 flex flex-col items-center overflow-y-auto">
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
            </div>
        </div>
    );
}
