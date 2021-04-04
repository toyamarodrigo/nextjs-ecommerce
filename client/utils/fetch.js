import { getToken, hasExpiredToken } from '../api/token';

export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    // User not logeado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      // Expired Token
      logout();
    } else {
      // Build temporal params + Authorization bearer
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
}