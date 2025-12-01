"use client"
import { useWallet } from '@crossmint/client-sdk-react-ui'
import React from 'react'

const DepositIframe = ({token}:{token: string}) => {
    const wallet = useWallet().wallet

 const Source_param = "bd3X9Cgq"

  return (
     <iframe
        src={`https://sandbox-pay.fonbnk.com/wallet?source=${Source_param}&network=BASE&asset=USDC&signature=${token}&amount=1&currency=crypto&paymentChannel=mpesa&countryIsoCode=KE&wallet=${wallet?.address}&freezeWallet=true`}
        // src={`https://sandbox-pay.fonbnk.com/?source=bd3X9Cgq&signature=${token}`}
        width="100%"
        height="500"
        style={{ border: "none", borderRadius: "8px" }}
        title="FonBonk"
      />
  )
}

export default DepositIframe