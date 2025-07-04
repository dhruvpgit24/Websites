import React, { useState } from "react";
import "../styles/AddBook.css";

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
  });

  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      alert("Title and Author are required!");
      return;
    }
    const newBooks = [...books, book];
    setBooks(newBooks);
    localStorage.setItem("myBooks", JSON.stringify(newBooks));
    alert("Book added!");
    setBook({ title: "", author: "", genre: "", description: "", image: "" });
  };

  return (
    <>
      <div className="add-book-page">
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit} className="add-book-form">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={book.image}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>
      <div className="form-steps">
        <h3>📘 How to Add a Book</h3>
        <ol>
          <li>
            <strong>Title:</strong> Enter the name of the book you want to sell
            or list.
          </li>
          <li>
            <strong>Author:</strong> Mention the writer's full name (e.g., J.K.
            Rowling).
          </li>
          <li>
            <strong>Genre:</strong> (Optional) Add a genre like Fiction,
            Romance, etc.
          </li>
          <li>
            <strong>Description:</strong> Write a short overview or any special
            notes (edition, highlights, etc.).
          </li>
          <li>
            <strong>Image URL:</strong> Paste a valid image URL (you can find
            book covers from Google or Open Library).
          </li>
          <li>
            <strong>Click Add Book:</strong> Your book will be stored locally
            and visible under <em>My Listings</em>.
          </li>
        </ol>
      </div>
    </>
  );
};

export default AddBookForm;
