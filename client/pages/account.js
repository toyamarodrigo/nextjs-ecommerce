import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
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
      <Configuration user={user} />
    </BasicLayout>
  );
}

const Configuration = ({ user }) => {
  return (
    <div className="account__configuration">
      <div className="title">Configuration</div>
      <div className="data">
        <ChangeNameForm user={user} />
      </div>
    </div>
  );
};
