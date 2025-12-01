// "use client"
// import { Card, CardContent } from '@/components/ui/card';
// import { useWallet } from '@crossmint/client-sdk-react-ui';
// import { ArrowDown, ArrowUp } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react'

// interface ActivityEvent {
//     token_symbol: string;
//     transaction_hash: string;
//     to_address: string;
//     from_address: string;
//     timestamp: number;
//     amount: string;
//     type: string;
// }
// const Trx = () => {
//     const [activity, setActivity] = useState<ActivityEvent[] | null>(null);
//     const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//     const { wallet } = useWallet();



//     const isValidJson = (str: string) => {
//         try {
//             JSON.parse(str);
//             return true;
//         } catch (e) {
//             return false;
//         }
//     };


//     const safeJsonParse = (str: string) => {
//         try {
//             return JSON.parse(str);
//         } catch (e) {
//             console.error("JSON parse error:", e);
//             console.log("Response that failed to parse:", str.substring(0, 100));
//             return null;
//         }
//     };



//     interface Props {
//         events: ActivityEvent[];
//         walletAddress?: string;
//     }

//     async function fetchActivity() {
//         try {
//             // Reset error state when fetching
//             setError(null);

//             // Check if wallet.experimental_activity is a function
//             if (typeof wallet?.experimental_activity !== 'function') {
//                 console.error("experimental_activity is not a function");
//                 setError("Activity API not available");
//                 setActivity({ events: [] });
//                 setHasInitiallyLoaded(true);
//                 return;
//             }

//             // Call the API
//             const activityResponse: unknown = await wallet.experimental_activity();
//             console.log("Raw activity response 68:", activityResponse);
//             // Check if response is a string that needs parsing
//             let activityData;
//             if (typeof activityResponse === 'string') {
//                 if (isValidJson(activityResponse)) {
//                     activityData = safeJsonParse(activityResponse);
//                 } else {
//                     console.error("Response is not valid JSON:", activityResponse.substring(0, 100));
//                     setError("Invalid response format");
//                     setActivity({ events: [] });
//                     setHasInitiallyLoaded(true);
//                     return;
//                 }
//             } else {
//                 // Response is already an object
//                 activityData = activityResponse;
//             }

//             // Ensure we have a valid response with events
//             if (activityData && activityData.events) {
//                 setActivity(activityData);
//                 console.log("Fetched activity 89:", activityData);
//             } else {
//                 // Set empty activity object with empty events array
//                 setActivity({ events: [] });
//             }
//         } catch (error) {
//             console.error("Failed to fetch activity:", error);

//             // More detailed error logging
//             if (error instanceof Error) {
//                 console.error("Error message:", error.message);
//                 console.error("Error stack:", error.stack);
//             }

//             setError("Failed to fetch activity");
//             // Set empty activity object with empty events array to prevent errors
//             setActivity({ events: [] });
//         } finally {
//             setHasInitiallyLoaded(true);
//         }
//     };
//     useEffect(() => {
//         if (!wallet) return;
//         // Initial fetch
//         fetchActivity();

//     }, [])

//     if (!wallet) {
//         return <div>No wallet connected</div>;
//     }

//     const walletAddress = wallet?.address;

//     const formatAddress = (addr: string) => {
//         if (!addr) return "";
//         return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
//     };

//     const formatTimestamp = (ts: number) => {
//         return new Date(ts).toLocaleString();
//     };


//     return (
//         <div className="space-y-3 w-full">
//             <div className='text-red-600'>Error: {error}</div>
//             TRx Activity for wallet: {walletAddress}
//             {activity?.events.map((event, index) => {
//                 const isIncoming =
//                     walletAddress &&
//                     event.to_address?.toLowerCase() === walletAddress.toLowerCase();

//                 return (
//                     <Card
//                         key={`${event.transaction_hash}-${index}`}
//                         className={`border ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                             } shadow-sm`}
//                     >
//                         <CardContent className="flex justify-between items-center py-4">
//                             {/* LEFT SIDE */}
//                             <div className="flex items-start gap-3">
//                                 {/* Icon */}
//                                 <div
//                                     className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncoming
//                                             ? "bg-green-100 text-green-600"
//                                             : "bg-blue-100 text-blue-600"
//                                         }`}
//                                 >
//                                     {isIncoming ? (
//                                         <ArrowDown size={16} />
//                                     ) : (
//                                         <ArrowUp size={16} />
//                                     )}
//                                 </div>

//                                 {/* Details */}
//                                 <div className="flex flex-col">
//                                     {/* Header */}
//                                     <div className="flex items-center gap-2">
//                                         <span className="font-semibold">
//                                             {isIncoming ? "Received" : "Sent"}
//                                         </span>
//                                         <span className="text-xs text-gray-500">
//                                             {formatTimestamp(event.timestamp)}
//                                         </span>
//                                     </div>

//                                     {/* Address */}
//                                     <span className="text-gray-600 text-sm">
//                                         {isIncoming
//                                             ? `From ${formatAddress(event.from_address)}`
//                                             : `To ${formatAddress(event.to_address)}`}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* RIGHT SIDE */}
//                             <div className="text-right">
//                                 <span
//                                     className={`text-lg font-semibold ${isIncoming ? "text-green-600" : "text-blue-600"
//                                         }`}
//                                 >
//                                     {isIncoming ? "+" : "-"}${event.amount}
//                                 </span>
//                                 <div className="text-sm text-gray-500">
//                                     {event.token_symbol}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 );
//             })}
//         </div>
//     )
// }

// export default Trx


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page