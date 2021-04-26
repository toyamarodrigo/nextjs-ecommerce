import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { Loader } from 'semantic-ui-react';
import { size, forEach } from 'lodash';
import { getFavoriteApi } from '../api/favorite';
import ListGames from '../components/ListGames';
import useAuth from '../hooks/useAuth';
import Seo from '../components/Seo';

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <Seo title="Wishlist" />
      <div className="wishlist__block">
        <div className="title">Wishlist</div>
        <div className="data">
          {!games && <Loader active>Loading games...</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>No games on wishlist</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
