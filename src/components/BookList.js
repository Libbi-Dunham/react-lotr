import React from 'react';

export default function BookList({ books }) {
  return (
    <section className="books">
      {books.map((book) => (
        <div className="book" key={book.title}>
          <div className="book-content">
            <h2>{book.title}</h2>
            <p>{book.created}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
