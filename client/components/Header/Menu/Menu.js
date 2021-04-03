import { useState } from 'react';
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth/Auth';

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Sign in');

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlataforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptions onShowModal={onShowModal} />
          </Grid.Column>
        </Grid>
        <BasicModal
          show={showModal}
          setShow={setShowModal}
          title={titleModal}
          size="small"
        >
          <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
        </BasicModal>
      </Container>
    </div>
  );
}

const MenuPlataforms = () => {
  return (
    <Menu>
      <Link href="/playstation">
        <Menu.Item as="a">Playstation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as="a">Xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as="a">Switch</Menu.Item>
      </Link>
    </Menu>
  );
};

const MenuOptions = (props) => {
  const { onShowModal } = props;
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        My Account
      </Menu.Item>
    </Menu>
  );
};
