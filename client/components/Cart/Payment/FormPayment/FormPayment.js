import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { size } from 'lodash';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';
import { paymentCartApi } from '../../../../api/cart';

export default function FormPayment({ products, address }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe && !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message);
    } else {

      console.log("products")
      console.log(products)

      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );

      console.log(response);

      if(size(response) > 0) {
        toast.success("Order completed")
      } else {
        toast.error("Order failed")
      }
    }

    setLoading(false);
  };

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Buy
      </Button>
    </form>
  );
}
