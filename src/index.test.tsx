import React from 'react';
import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import useAbortableFetch from './index';

global.fetch = fetch;

const LoadData = (): JSX.Element => {
  const { data, loading, error } = useAbortableFetch('http://some-server');

  return (
    <div>
      <div>Loading: {JSON.stringify(loading)}</div>
      <div>Error: {JSON.stringify(error)}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
};

test('Renders the data after success', async (): Promise<void> => {
  (fetch as any).mockResponseOnce(JSON.stringify({ x: 1 }), {
    headers: {
      'content-type': 'application/json',
    },
  });

  render(<LoadData />);

  screen.getByText('Loading: true');
  await screen.findByText('Loading: false');

  screen.getByText('Data: {"x":1}');
  screen.getByText('Error: null');
});

test('Renders the error after failure', async (): Promise<void> => {
  (fetch as any).mockResponseOnce(
    JSON.stringify({
      x: 2,
    }),
    {
      status: 404,
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  render(<LoadData />);

  screen.getByText('Loading: true');
  await screen.findByText('Loading: false');

  screen.getByText('Data: {"x":2}');
  screen.getByText('Error: {"status":404}');
});
