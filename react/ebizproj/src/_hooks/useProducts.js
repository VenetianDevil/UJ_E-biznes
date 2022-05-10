import { environment } from '../environment.ts';
import useServerService from './useServerService';

function useProduct() {
  // const [productID, setProductId] = useState();
  const [request] = useServerService()

  function getProducts() {
    console.log('u getProducts');
    
    return request('GET', `${environment.serverUrl}/products`);
  };

  return [getProducts];
}

export default useProduct;
