import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';
import AddressForm from '../components/Account/AddressForm';
import AddressList from '../components/Account/AddressList';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';
import BasicModal from '../components/Modal/BasicModal';

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace('/');
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

const Configuration = ({ user, logout, setReloadUser }) => {
  return (
    <div className="account__configuration">
      <div className="title">Configuration</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
};

const Addresses = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Addresses
        <Icon name="plus" link onClick={() => openModal('New Address')} />
      </div>
      <div className="data">
        <AddressList
          setReloadAddresses={setReloadAddresses}
          reloadAddresses={reloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
};
