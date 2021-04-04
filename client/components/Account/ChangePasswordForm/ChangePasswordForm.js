import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../../../api/user';

export default function ChangePasswordForm({ user, logout }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response || response?.statusCode === 400) {
        toast.error('Error: Fail updating password');
      } else {
        toast.success('Password Updated successfuly');
        logout();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h4>Change Password</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            placeholder="New password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            placeholder="Confirm new password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Update
        </Button>
      </Form>
    </div>
  );
}

const initialValues = () => {
  return {
    password: '',
    repeatPassword: '',
  };
};

const validationSchema = () => {
  return {
    password: Yup.string()
      .required()
      .oneOf([Yup.ref('repeatPassword')], true),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], true),
  };
};
