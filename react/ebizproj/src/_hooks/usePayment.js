import { environment } from '../environment.ts';
import useServerService from './useServerService';

function usePayment() {
  const [request] = useServerService()

  function orderAndPay(uid) {
    console.log('u orderAndPay');

    return request('POST', `${environment.serverUrl}/payment/${uid}`);
  }

  return [orderAndPay];
}

export default usePayment;
