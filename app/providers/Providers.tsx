"use client";

import {
    CrossmintProvider,
    CrossmintAuthProvider,
    CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-ui";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ""}>
            <CrossmintAuthProvider>
                <CrossmintWalletProvider
                    createOnLogin={{
                        // @ts-expect-error -- types are wrong here
                        chain: "evm",
                        signer: {
                            type: "email",
                        },
                    }}
                >
                {children}
                </CrossmintWalletProvider>
            </CrossmintAuthProvider>
        </CrossmintProvider>
    );
}