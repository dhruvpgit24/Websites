import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturedListings.css";

const FeaturedListings = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=fiction&limit=7")
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.docs.filter((book) => book.cover_i && book.key);
        const formatted = filteredBooks.map((book) => ({
          id: book.key.replace("/works/", ""),
          title: book.title,
          author: book.author_name?.[0] || "Unknown Author",
          image: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          year: book.first_publish_year || "N/A",
        }));
        setBooks(formatted.slice(0, 7));
      });
  }, []);

  return (
    <section className="featured-listings">
      <h2>📘 Featured Listings</h2>
      <div className="book-grid">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <small>📅 {book.year}</small>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
