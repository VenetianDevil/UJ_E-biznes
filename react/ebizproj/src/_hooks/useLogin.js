import { environment } from '../environment.ts';
import useServerService from './useServerService';

function useLogin() {
  const [request] = useServerService()

  function signMeIn(user) {
    console.log(user);

    return request('POST', `${environment.serverUrl}/auth/signin`, user);
  }

  function logMeIn(user) {
    console.log(user);
    return request('POST', `${environment.serverUrl}/auth/login`, user);
  }

  return { signMeIn, logMeIn };

}

export default useLogin;
