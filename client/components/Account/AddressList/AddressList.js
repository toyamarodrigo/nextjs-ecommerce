import React, { useState, useEffect } from 'react';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressList() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  console.log(addresses);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div>
      <h1>Address List</h1>
    </div>
  );
}
