import React from 'react';
import { Form, Button, ButtonOr } from 'semantic-ui-react';

export default function AddressForm() {
  return (
    <Form>
      <Form.Input
        name="title"
        type="text"
        label="Address Title"
        placeholder="Address Title"
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Name and Lastname"
          placeholder="Name and Lastname"
        />
        <Form.Input
          name="address"
          type="text"
          label="Address"
          placeholder="Address"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input name="city" type="text" label="City" placeholder="City" />
        <Form.Input
          name="state"
          type="text"
          label="State"
          placeholder="State"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder="Postal Code"
        />
        <Form.Input
          name="phone"
          type="text"
          label="Phone Number"
          placeholder="Phone Number"
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit">
          Create Address
        </Button>
      </div>
    </Form>
  );
}
