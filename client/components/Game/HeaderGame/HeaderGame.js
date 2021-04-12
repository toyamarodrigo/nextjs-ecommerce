import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';

export default function HeaderGame({ game }) {
  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={game[0].poster.url} alt={game[0].title} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <p>Game info</p>
      </Grid.Column>
    </Grid>
  );
}
