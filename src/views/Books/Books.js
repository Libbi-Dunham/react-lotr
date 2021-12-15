import React, { useEffect, useState } from 'react';
import BookList from '../../components/BookList';
import { fetchBooks } from '../../services/books';

export default function Books() {
  const [bookData, setbookData] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    const response = await fetchBooks();
    setbookData(response);
  };
  return (
    <div>
      <h2>Books</h2>
      <BookList books={bookData} />
    </div>
  );
}
