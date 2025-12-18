import React from 'react'
import * as jsonwebtoken from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';



const page = () => {

  // const token = jsonwebtoken.sign(
  //   {
  //     uid: uuid(),
  //   },
  //   process.env.SIGNATURE_SECRET!,
  //   {
  //     algorithm: 'HS256',
  //   },
  // );
  const Source_param = process.env.NEXT_PUBLIC_SOURCE_PARAM;


  // const url = `https://${process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "sandbox-" : ""}pay.fonbnk.com/offramp/?source=${Source_param}&network=BASE&asset=USDC&freezeWallet=true&hideSwitch=true&signature=${token}`

  const url = `https://${process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "sandbox-" : ""}pay.fonbnk.com/offramp/?source=${Source_param}&network=BASE&asset=USDC&freezeWallet=true&hideSwitch=true`

  console.log("Offramp URL:", url);
  return (
    <iframe
      // src={`https://sandbox-pay.fonbnk.com/offramp?source=bd3X9Cgq&signature=${token}`}
      // src={`https://sandbox-pay.fonbnk.com/offramp/?source=${Source_param}&network=BASE&signature=${token}&hideSwitch=true`}
      src={url}
      width="100%"
      height="500"
      style={{ border: "none", borderRadius: "8px" }}
      title="FonBonk"
    />
  )
}

export default page