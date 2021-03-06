import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import BasicLayout from '../../Modal/BasicModal';

export default function Order({
  order,
  order: {
    game,
    game: { title, poster, url },
    totalPayment,
    createdAt,
    shippingAddress,
  },
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>${totalPayment}</p>
            </div>
          </div>
        </div>
        <div className="order__other">
          <p className="order__other-date">
            {moment(createdAt).format('L')} - {moment(createdAt).format('LT')}
          </p>
          <Icon name="eye" circular link onClick={() => setShowModal(true)} />
        </div>
      </div>

      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        shippingAddress={shippingAddress}
        title={title}
      />
    </>
  );
}

function AddressModal({ showModal, setShowModal, shippingAddress, title }) {
  return (
    <BasicLayout
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente direccion: </h3>
      <div>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>
          {shippingAddress.state}, {shippingAddress.city},
          {shippingAddress.postalCode}
        </p>
      </div>
    </BasicLayout>
  );
}
