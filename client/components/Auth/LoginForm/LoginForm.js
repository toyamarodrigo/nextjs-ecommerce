import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { loginApi, recoverPasswordApi } from '../../../api/user';

export default function LoginForm({ showRegisterForm, onCloseModal }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationScheme: Yup.object(validationScheme()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);

      if (response?.jwt) {
        login(response.jwt);
        toast.success('Log in successful');
        onCloseModal();
      } else {
        toast.error('Email or Password incorrect, please try again');
      }
      setLoading(false);
    },
  });

  const recoverPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      recoverPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Create an account
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Sign in
          </Button>
          <Button type="button" onClick={recoverPassword}>
            Forgot password?
          </Button>
        </div>
      </div>
    </Form>
  );
}

const initialValues = () => {
  return {
    identifier: '',
    password: '',
  };
};

const validationScheme = () => {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
};
