import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useRouter } from 'next/router';

export default function Platform() {
  const { query } = useRouter();

  return (
    <BasicLayout className="platforms">
      <h1>Estamos en plataformas: {query.platforms}</h1>
    </BasicLayout>
  );
}
