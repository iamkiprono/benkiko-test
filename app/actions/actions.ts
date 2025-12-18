"use server";
export const getWalletBalance = async (address: string) => {
  console.log("Getting wallet balance for address:", address);
  const url = `${
    process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API
  }/api/2025-06-09/wallets/${address ?? ""}/balance?tokens=usdc`;
  console.log("Fetch URL:", url);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API}/api/2025-06-09/wallets/${
        address ?? ""
      }/balances?tokens=usdc`,
      {
        headers: {
          "x-api-key": process.env.NEXT_SERVER_CROSSMINT_API_KEY ?? "",
        },
      }
    );

    const data = await res.json();
    console.log({ balance: data });
    if (!res.ok) {
      throw Error(data.message || "Failed to fetch wallet balance");
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
