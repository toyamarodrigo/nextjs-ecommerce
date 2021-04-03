import React, { useMemo, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { setToken, getToken } from '../api/token';
import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false)
  }, [reloadUser]);

  // Login function from any component
  const login = (token) => {
    // set Token into localStorage
    setToken(token);
    // adds token + id to auth state
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  // useMemo will update only if data is different
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setReloadUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />;
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
