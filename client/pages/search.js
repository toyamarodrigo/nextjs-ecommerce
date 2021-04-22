import React, { useState, useEffect } from 'react';
import { Loader, loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { searchGameApi } from '../api/game';
import ListGames from '../components/ListGames';

export default function search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById('search-game').focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGameApi(query.query);
        if (size(response) > 0) setGames(response);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!games && <Loader active>Searching games...</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No games found</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
