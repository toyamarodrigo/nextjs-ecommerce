import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth({ onCloseModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal('Sign in')
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal('Sign up')
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
