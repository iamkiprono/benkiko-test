"use client"
import { useWallet } from '@crossmint/client-sdk-react-ui'
import React from 'react'

const DepositIframe = ({token}:{token: string}) => {
    const wallet = useWallet().wallet

 const Source_param = process.env.NEXT_PUBLIC_SOURCE_PARAM;

  //  const url =    `https://${process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "sandbox-" : ""}pay.fonbnk.com/wallet?source=${Source_param}&network=BASE&asset=USDC&signature=${token}&amount=1&currency=crypto&paymentChannel=mpesa&countryIsoCode=KE&wallet=${wallet?.address}&freezeWallet=true`

   const url =    `https://${process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "sandbox-" : ""}pay.fonbnk.com/?source=${Source_param}&network=BASE&asset=USDC&signature=${token}&currency=crypto&paymentChannel=mpesa&countryIsoCode=KE&address=${wallet?.address}&freezeWallet=true&hideSwitch=true`

   console.log("Deposit URL:", url);

  return (
     <iframe
        src={url}
        // src={`https://sandbox-pay.fonbnk.com/?source=bd3X9Cgq&signature=${token}`}
        width="100%"
        height="500"
        style={{ border: "none", borderRadius: "8px" }}
        title="FonBonk"
      />
  )
}

export default DepositIframe