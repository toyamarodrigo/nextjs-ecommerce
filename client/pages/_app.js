import React, { useMemo, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { setToken, getToken, removeToken } from '../api/token';
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart
} from '../api/cart';

import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductCart, setTotalProductCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

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
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

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

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push('/');
    }
  };

  // useMemo will update only if data is different
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning('You need to sign in before buying a game');
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product)
    setReloadCart(true);
  }

  const cartData = useMemo(
    () => ({
      productsCart: totalProductCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
