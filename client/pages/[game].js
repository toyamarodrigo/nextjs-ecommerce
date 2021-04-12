import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getGameByUrlApi } from '../api/game';
import HeaderGame from '../components/Game/HeaderGame';

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if (!game) return null;

  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <p>Tabs Game</p>
    </BasicLayout>
  );
}
