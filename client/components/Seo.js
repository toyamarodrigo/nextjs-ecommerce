import React from 'react';
import Header from 'next/head';

export default function Seo({ title, description }) {
  return (
    <Header>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Header>
  );
}

Seo.defaultProps = {
  title: 'Gaming - Your favorites games',
  description: 'Your favorites games for Steam, PS4, Xbox, Switch',
};
