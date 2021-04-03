import React from 'react'

export default function LoginForm({showRegisterForm}) {
  return (
    <div>
      <h1>Login Form</h1>
      <button onClick={showRegisterForm}>Create an account</button>
    </div>
  );
}
