import { render } from '@testing-library/react';
import BookList from './BookList';

test('renders the book name', () => {
  const container = render(<BookList books={[]} />);
  expect(container).toMatchSnapshot();
});
