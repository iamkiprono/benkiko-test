import { cookies } from "next/headers";
import { createCrossmint, CrossmintAuth } from "@crossmint/server-sdk";

export async function getAuthSession() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("crossmint-jwt")?.value;
    const refreshToken = cookieStore.get("crossmint-refresh-token")?.value;

    if (refreshToken == null) {
        return;
    }

    try {
        const crossmint = createCrossmint({
            apiKey: process.env.SERVER_CROSSMINT_API_KEY || "",
        });
        const crossmintAuth = CrossmintAuth.from(crossmint);

        const session = await crossmintAuth.getSession({
            jwt,
            refreshToken,
        });
        return session;
    } catch (_) {
        return;
    }
}