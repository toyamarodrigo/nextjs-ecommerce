import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { getAddressesApi, deleteAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressList({
  reloadAddresses,
  setReloadAddresses,
  openModal,
}) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  // We could use a Loading spinner
  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No addresses found</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

const Address = ({ address, logout, setReloadAddresses, openModal }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressesApi(address.id, logout);
    if (response) setReloadAddresses(true);
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Edit: ${address.title}`, address)}
        >
          Edit
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
