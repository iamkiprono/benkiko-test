import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  status: string;
  walletType: string;
  chainType: string;
  sendParams: {
    token: string;
    params: {
      amount: string;
      recipient: string;
      recipientAddress: string;
    };
  };
  createdAt: string;
  completedAt?: string;
  error?: {
    reason: string;
    message: string;
    simulationLink?: string;
  };
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const statusColor = (status: string) => {
  switch (status) {
    case "awaiting-approval":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const CrossmintTransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Completed At</TableHead>
            <TableHead>Error</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-mono text-sm">{tx.id}</TableCell>
              <TableCell>
                <Badge className={statusColor(tx.status)}>
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell>{tx.walletType}</TableCell>
              <TableCell>{tx.chainType}</TableCell>
              <TableCell>
                {tx?.sendParams?.params?.amount} {tx?.sendParams?.token?.split(":")[1]}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {tx.sendParams?.params?.recipientAddress}
              </TableCell>
              <TableCell>
                {new Date(tx.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {tx.completedAt ? new Date(tx.completedAt).toLocaleString() : "-"}
              </TableCell>
              <TableCell className="text-sm text-red-600">
                {tx.error ? (
                  <a
                    href={tx.error.simulationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {tx.error.reason}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


export default CrossmintTransactionsTable;