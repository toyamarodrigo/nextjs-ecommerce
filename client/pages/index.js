import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { getLastGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';

export default function Home() {
  const [games, setGames] = useState(null);
  console.log(games);

  useEffect(() => {
    async () => {
      const response = await getLastGamesApi(4);
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    };
  }, []);

  return (
    <BasicLayout>
      <h1>NextJS Home</h1>
    </BasicLayout>
  );
}
