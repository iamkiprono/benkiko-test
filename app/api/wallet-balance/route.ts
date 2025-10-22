// app/api/wallet-balance/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  console.log("Getting wallet balance for address:", address);

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Missing wallet address" },
      { status: 400 }
    );
  }

  const url = `${process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API}/2025-06-09/wallets/${address}/balances?tokens=usdc`;
  console.log("Fetch URL:", url);

  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": process.env.NEXT_SERVER_CROSSMINT_API_KEY ?? "",
      },
    });

    const data = await res.json();
    console.log({ balance: data });

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch wallet balance");
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
