import Cookies from 'universal-cookie';
import decode from 'jwt-decode';

export const checkAuth = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const refreshToken = cookies.get("refresh-token");
  console.log(`Token: ${token}`);
  console.log(`refreshToken: ${refreshToken}`);
  
  if(!token || !refreshToken) {
    return false;
  }
  
  try {
    const { exp } = decode(refreshToken);
    if(exp < new Date().getTime()/1000 ) {
      return false;
    }
  } catch(e) {
    return false;
  }

  return true;
}

export const getUserId = () => {
  const cookies = new Cookies();
  const refreshToken = cookies.get("refresh-token");
  
  try {
    const { user: { id } } = decode(refreshToken);
    console.log("from auth: " + id);
    return id;
  } catch(e) {
    return null;
  }

}