
import * as jsonwebtoken from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import DepositIframe from '../app-components/DepositIframe';



const DepositPage = () => {

  

  const token = jsonwebtoken.sign(
    {
      uid: uuid(),
    },
   
    process.env.SIGNATURE_SECRET as string,
    {
      algorithm: 'HS256',
    },
 );

  return (
   <DepositIframe token={token}/>
  )
}

export default DepositPage