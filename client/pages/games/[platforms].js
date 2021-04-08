import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getGamesPlatformApi } from '../../api/game';
import ListGames from '../../components/ListGames/ListGames';

const limitPerPage = 4;

export default function Platform() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.platforms) {
        const response = await getGamesPlatformApi(
          query.platforms,
          limitPerPage,
          0
        );
        setGames(response);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="platforms">
      {!games && <Loader active>Loading games...</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No games</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
