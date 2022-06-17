import { environment } from '../environment.ts';
import useServerService from './useServerService';

function usePayment() {
  const [request] = useServerService()

  function placeOrder(uid) {
    console.log('u placeOrder');

    return request('POST', `${environment.serverUrl}/order/${uid}`);
  }

  function getSecret(amount) {
    console.log('u getSecret');

    return request('GET', `${environment.serverUrl}/secret/${amount*100}`);
  }

  return { placeOrder, getSecret };
}

export default usePayment;
