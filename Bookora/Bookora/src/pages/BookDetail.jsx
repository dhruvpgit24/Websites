import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  const [price] = useState(() => (Math.random() * 100 + 50).toFixed(2));
  const conditionOptions = ["New", "Like New", "Used", "Old"];
  const [condition] = useState(
    () => conditionOptions[Math.floor(Math.random() * conditionOptions.length)]
  );
  const location = "Ahmedabad, India";

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Failed to fetch book:", err));
  }, [id]);

  if (!book)
    return <div className="book-detail loading">Loading book details...</div>;

  return (
    <div className="book-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-content">
        {book.covers && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
            className="book-cover"
          />
        )}

        <div className="book-info">
          <h2>{book.title}</h2>

          {book.description && (
            <p className="book-desc">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.subjects && (
            <p className="book-subjects">
              <strong>Subjects:</strong> {book.subjects.slice(0, 6).join(", ")}
            </p>
          )}

          {book.first_publish_date && (
            <p>
              <strong>Published:</strong> {book.first_publish_date}
            </p>
          )}

          <div className="buy-details">
            <p className="price">
              <strong>Price:</strong> ₹{price}
            </p>
            <p className="location">
              <strong>Location:</strong> {location}
            </p>
            <p className="condition">
              <strong>Condition:</strong> {condition}
            </p>
            <Link to={`/contact/${id}`} className="contact-btn">
              📩 Contact Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
