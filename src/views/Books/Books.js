import React, { useEffect, useState } from 'react';
import BookList from '../../components/BookList';

export default function Books() {
  const [bookData, setbookData] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    const response = await fetch('https://the-one-api.dev/v2/book', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    const bookData = await response.json();
    setbookData(bookData.docs);
  };
  return (
    <div>
      <p>Books</p>
      <BookList books={bookData} />
    </div>
  );
}
