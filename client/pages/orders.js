import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import Order from '../components/Orders/Order';
import Seo from '../components/Seo';

export default function orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo title="My Orders" description="Order list"/>
      <div className="orders__block">
        <div className="title">My Orders</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: 'center' }}>No orders yet</h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

const OrderList = ({ orders }) => {
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
};
