import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/MyListings.css";

const MyBookDetail = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    if (storedBooks[index]) {
      setBook(storedBooks[index]);
    }
  }, [index]);

  const handleRemove = () => {
    const storedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    storedBooks.splice(index, 1);
    localStorage.setItem("myBooks", JSON.stringify(storedBooks));
    navigate("/my-listings");
  };

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-content">
        <div className="book-info">
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          {book.genre && (
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
          )}
          {book.description && (
            <p className="book-description">{book.description}</p>
          )}
          <button className="remove-btn" onClick={handleRemove}>
            ❌ Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookDetail;
