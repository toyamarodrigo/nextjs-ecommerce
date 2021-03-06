import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';
import ShippingAddress from '../components/Cart/ShippingAddress';
import Payment from '../components/Cart/Payment';
import Seo from '../components/Seo';

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <Seo title="Empty Cart" />
      <h2>No games in cart</h2>
    </BasicLayout>
  );
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="full-cart">
      <Seo title="My Cart" />
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <ShippingAddress setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
