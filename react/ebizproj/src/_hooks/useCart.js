import { useState } from 'react';
import { environment } from '../environment.ts';

import useServerService from './useServerService';

function useCart(pid) {
  const [request] = useServerService();
  const [productID, setProductId] = useState(pid);

  function getCart(uid) {
    console.log('u getCart', uid);
    return request('GET', `${environment.serverUrl}/cart/${uid}`);
  }

  function addToCart(uid) {
    console.log('u addToCart', productID, uid);

    return request('POST', `${environment.serverUrl}/cart/${uid}`, { ProductID: productID, UserID: uid });
  }

  return {productID, setProductId, getCart, addToCart};
}

export default useCart;
