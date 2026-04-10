import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the profile studio heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /profile generator/i })
  ).toBeInTheDocument();
});
