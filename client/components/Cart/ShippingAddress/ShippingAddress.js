import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import Link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function ShippingAddress({ setAddress }) {
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="shipping-address">
      <div className="title">Shipping Address</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No shipping addresses
            <Link href="/account">
              <a>Add address </a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  setAddress={setAddress}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address({ address, setAddress, addressActive, setAddressActive }) {
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames('address', {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
