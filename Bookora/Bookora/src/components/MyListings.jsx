import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyListings.css";

const MyListings = () => {
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    setMyBooks(storedBooks);
  }, []);

  return (
    <div className="my-listings">
      <h2>📚 My Listings</h2>
      {myBooks.length === 0 ? (
        <p className="empty-msg">No books listed yet. Go to Add Book to add one!</p>
      ) : (
        <div className="listing-grid">
          {myBooks.map((book, idx) => (
            <div
              key={idx}
              className="book-card"
              onClick={() => navigate(`/my-book/${idx}`)}
            >
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
