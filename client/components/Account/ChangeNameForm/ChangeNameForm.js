import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function ChangeNameForm({ user }) {
  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationScheme()),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Change your name and lastname</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="New name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="New last name"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit">Update</Button>
      </Form>
    </div>
  );
}

const initialValues = (name, lastname) => {
  return {
    name: name || '',
    lastname: lastname || '',
  };
};

const validationScheme = () => {
  return {
    name: Yup.string().required(),
    lastname: Yup.string().required(),
  };
};
