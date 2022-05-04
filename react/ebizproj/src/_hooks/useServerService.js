import { environment } from '../environment.ts';
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';

function useServerService() {
  async function request(method, url, data) {
    console.log('gonna fetch')
  
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          if (res.message) {
            console.info(res.message);
          }
  
          return res;
        })
        .catch(error => {
          console.error(`error: ${error.message}`);
        })
  
      return response;
    } catch (err) {
      console.error(err)
    }
  }
  
  function getProducts() {
    return request('GET', `${environment.serverUrl}/products`);
  };
  
  function addToCart(prodID, uid) {
    return request('POST', `${environment.serverUrl}/cart`, { ProductID: prodID, UserID: uid });
  };
  
  function payment() {
    return request('POST', `${environment.serverUrl}/payment`, {});
  }

  return [ getProducts, addToCart, payment ];
}

export default useServerService;
