import { environment } from '../environment.ts';
import useServerService from './useServerService';

function useProduct() {
  const [request] = useServerService()

  function getProducts() {
    return request('GET', `${environment.serverUrl}/products`);
  }

  return [getProducts];
}

export default useProduct;
