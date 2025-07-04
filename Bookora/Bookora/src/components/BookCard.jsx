import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book, onClick }) => {
  const coverId = book.cover_id || (book.cover_i || null);
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '/images/no-cover.png';

  return (
    <div className="book-card" onClick={onClick}>
      <img src={imageUrl} alt={book.title} />
      <h4>{book.title}</h4>
      <p>{book.author_name?.[0] || 'Unknown Author'}</p>
    </div>
  );
};

export default BookCard;