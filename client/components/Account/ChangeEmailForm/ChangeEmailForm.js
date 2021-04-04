import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateNameApi } from '../../../api/user';

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
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
