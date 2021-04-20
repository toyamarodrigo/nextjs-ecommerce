import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { size } from 'lodash';
import { isFavoriteApi } from '../../../api/favorite';
import useAuth from '../../../hooks/useAuth';
import { authFetch } from '../../../utils/fetch';

export default function HeaderGame({ game, game: { title, poster } }) {
  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

const Info = ({ game, game: { title, summary, price, discount } }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
  }, [game]);

  const addFavorite = () => {
    console.log("Anadir a favoritos")
  }

  const removeFavorite = () => {
    console.log("Eliminando de favoritos")
  }

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? 'heart' : 'heart outline'}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? removeFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48hs</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>${price - Math.floor(price * discount) / 100}</p>
          </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
      </div>
    </>
  );
};
