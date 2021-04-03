import React from 'react';
import { Form, Button, ButtonOr } from 'semantic-ui-react';

export default function RegisterForm({ showLoginForm }) {
  return (
    <Form className="login-form">
      <Form.Input name="name" type="text" placeholder="First Name" />
      <Form.Input name="lastname" type="text" placeholder="Last Name" />
      <Form.Input name="username" type="text" placeholder="Username" />
      <Form.Input name="email" type="text" placeholder="Email" />
      <Form.Input name="password" type="password" placeholder="Password" />
      <div className="actions">
        <Button type="button" basic>
          Sign in
        </Button>
        <Button type="submit" className="submit">
          Sign up
        </Button>
      </div>
    </Form>
  );
}
