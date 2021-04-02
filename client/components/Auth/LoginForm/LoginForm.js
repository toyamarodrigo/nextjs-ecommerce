import React from 'react'

export default function LoginForm({showRegisterForm}) {
  return (
    <div>
      <h1>Formulario de Login</h1>
      <button onClick={showRegisterForm}>Ir a registro</button>
    </div>
  );
}
