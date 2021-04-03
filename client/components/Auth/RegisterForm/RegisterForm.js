import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';

export default function RegisterForm({ showLoginForm }) {
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      registerApi(formData);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="First Name"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Last Name"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Username"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
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

const initialValue = () => {
  return {
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };
};

const validationSchema = () => {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
};
