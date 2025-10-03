import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const walletLocator = searchParams.get("wallet");

  if (!walletLocator) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://staging.crossmint.com/api/2025-06-09/wallets/${walletLocator}/transactions`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.CROSSMINT_API_KEY ?? "",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: "Failed to fetch transactions", details: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
     // Narrow the type before using
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
