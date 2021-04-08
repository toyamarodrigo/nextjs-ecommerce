import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game';
import ListGames from '../../components/ListGames/ListGames';

const limitPerPage = 4;

export default function Platform() {
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  const { query } = useRouter();

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

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

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platforms);
      setTotalGames(response);
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
