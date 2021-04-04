import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
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
      <Configuration />
    </BasicLayout>
  );
}

const Configuration = () => {
  return (
    <div className="account__configuration">
      <div className="title">Configuration</div>
      <div className="data">Form configuration</div>
    </div>
  );
};
