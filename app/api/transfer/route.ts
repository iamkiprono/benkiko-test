// app/api/transfer/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse incoming request body
    const { walletLocator, tokenLocator, recipient, signer, amount, memo } = await request.json();

    console.log({ walletLocator, tokenLocator, recipient, signer, amount, memo })

    // Build the target URL dynamically
    const url = `${process.env.NEXT_SERVER_CROSSMINT_API_KEY}/api/2025-06-09/wallets/${walletLocator}/tokens/${tokenLocator}/transfers`;

    // Prepare request options
    const options = {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.NEXT_SERVER_CROSSMINT_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient,
        signer,
        amount,
        memo,
      }),
    };

    // Send the request to Crossmint API
    const response = await fetch(url, options);

    // Parse response
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // Return successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during transfer:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
