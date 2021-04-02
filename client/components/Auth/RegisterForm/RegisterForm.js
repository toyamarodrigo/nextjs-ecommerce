import React from 'react'

export default function RegisterForm({ showLoginForm }) {
  return (
    <div>
      <h1>Estamos en formulario Registro</h1>
      <button onClick={showLoginForm}>Ir a login</button>
    </div>
  );
}
