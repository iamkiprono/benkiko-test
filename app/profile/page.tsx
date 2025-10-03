"use client"
import { useAuth } from "@crossmint/client-sdk-react-ui";

export default function User() {
    const { user } = useAuth();

    

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div>
            <h1>User</h1>
            <p>User ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>

            <p>Farcaster FID: {user.farcaster?.fid}</p>
            <p>Farcaster Username: {user.farcaster?.username}</p>
            <p>Farcaster Bio: {user.farcaster?.bio}</p>
            <p>Farcaster Display Name: {user.farcaster?.displayName}</p>
            <p>Farcaster PFP URL: {user.farcaster?.pfpUrl}</p>
            <p>Farcaster Custody: {user.farcaster?.custody}</p>
            <p>Farcaster Verifications: {user.farcaster?.verifications}</p>
        </div>
    );
}