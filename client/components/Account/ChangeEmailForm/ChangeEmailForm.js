import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateEmailApi } from '../../../api/user';

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        toast.error('Error: Fail updating email');
      } else {
        setReloadUser(true);
        toast.success('Email Updated successfuly');
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Change email <span>(actual email: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="New email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirm new email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
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
    email: '',
    repeatEmail: '',
  };
};

const validationSchema = () => {
  return {
    email: Yup.string()
      .email(true)
      .required()
      .oneOf([Yup.ref('repeatEmail')], true),
    repeatEmail: Yup.string()
      .email(true)
      .required()
      .oneOf([Yup.ref('email')], true),
  };
};
