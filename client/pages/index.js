import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { getLastGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import ListGames from '../components/ListGames/ListGames';

export default function Home() {
  const [games, setGames] = useState(null);
  console.log(games);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(4);
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout>
      {!games && <Loader active>Loading games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No games</h3>
        </div>
      )}

      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
