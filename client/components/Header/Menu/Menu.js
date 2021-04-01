import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';

export default function MenuWeb() {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlataforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptions />
          </Grid.Column>
        </Grid>
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

const MenuOptions = () => {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
};
