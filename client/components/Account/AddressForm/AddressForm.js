import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { createAddressApi, updateAddressesApi } from '../../../api/address';
import { toast } from 'react-toastify';

export default function AddressForm({
  setShowModal,
  setReloadAddresses,
  newAddress,
  address,
}) {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      if (newAddress) {
        createAddress(formData);
      } else {
        updateAddress(formData)
      }
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);

    if (!response) {
      toast.warning('Fail creating address');
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success('Address created');
    }

    setLoading(false);
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await updateAddressesApi(address._id, formDataTemp, logout);

    if (!response) {
      toast.warning('Fail updating address');
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success('Address Updated');
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Address Title"
        placeholder="Address Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Name and Lastname"
          placeholder="Name and Lastname"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Address"
          placeholder="Address"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="City"
          placeholder="City"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="State"
          placeholder="State"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder="Postal Code"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Phone Number"
          placeholder="Phone Number"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? 'Create Address' : 'Update Address'}
        </Button>
      </div>
    </Form>
  );
}

const initialValues = (address) => {
  return {
    title: address?.title || '',
    name: address?.name || '',
    address: address?.address || '',
    city: address?.city || '',
    state: address?.state || '',
    postalCode: address?.postalCode || '',
    phone: address?.phone || '',
  };
};

const validationSchema = () => {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
};
