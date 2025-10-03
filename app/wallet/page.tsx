
"use client"
import { useWallet } from "@crossmint/client-sdk-react-ui";

export default function Wallet() {
    const { wallet, status } = useWallet();

    console.log({wallet, status})

    if (status === "in-progress") {
        return <div>Loading...</div>;
    }

    if (status === "loaded" && wallet) {
        return <div>Connected: {wallet.address}</div>;
    }

    return <div>Wallet not connected</div>;
}
