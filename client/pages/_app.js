import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  // useMemo will update only if data is different
  const authData = useMemo(
    () => ({
      auth: { name: 'Rodri', email: 'rodri.toyama@gmail.com' },
      login: () => null,
      logout: () => null,
      setRealoadUser: () => null,
    }),
    []
  );



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
