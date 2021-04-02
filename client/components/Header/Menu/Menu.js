import { useState } from 'react';
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
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
          title="Sign in"
          size="small"
        >
          <h2>Contenido de modal</h2>
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
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
};
