"use server";
export const getWalletBalance = async (address: string) => {
  console.log("Getting wallet balance for address:", address);
  const url = `${
    process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API
  }/api/2025-06-09/wallets/${address ?? ""}/balance?tokens=usdc`;
  console.log("Fetch URL:", url);
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API
      }/api/2025-06-09/wallets/${address ?? ""}/balances?tokens=usdc`,
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

export const createCheckoutSession = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const line1 = formData.get("line1") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;
  const slug = formData.get("slug") as string;
  console.log({ email, name, line1, city, postalCode, state, country, slug });

  // return;
  try {
    const options = {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.NEXT_SERVER_CROSSMINT_API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: {
          method: "base",
          currency: "usdc",
          receiptEmail: "jsmith@example.com",
          // payerAddress: "<string>",
        },
        lineItems: {
          collectionLocator: `crossmint:${slug}`,
          // callData: { totalPrice: "<string>" },
        },
        recipient: {
          email,
          physicalAddress: {
            name,
            line1,
            city,
            postalCode,
            country,
            line2: "<string>",
            state,
          },
        },
        locale: "en-US",
      }),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API}/api/2022-06-09/orders`,
      options
    );

    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message || "Failed to create checkout session");
    }
    console.log({ data });
    return {
      successs: true,
      data,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
