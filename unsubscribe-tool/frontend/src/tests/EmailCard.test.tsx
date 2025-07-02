import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailCard from '../components/EmailCard';
import { QueryClient, QueryClientProvider } from 'react-query';

test('renders email card and unsubscribes', async () => {
  const qc = new QueryClient();
  const mock = jest.spyOn(require('../services/api').default, 'unsubscribe').mockResolvedValue(undefined);

  render(
    <QueryClientProvider client={qc}>
      <EmailCard sender="test@example.com" count={5} lastDate={new Date().toISOString()} />
    </QueryClientProvider>
  );

  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Unsubscribe'));
  expect(mock).toHaveBeenCalledWith('test@example.com');
});