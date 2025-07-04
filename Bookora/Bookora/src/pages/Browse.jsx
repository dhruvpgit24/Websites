import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import "../styles/Browse.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const genres = ["fiction", "romance", "science_fiction", "fantasy", "mystery"];

const Browse = () => {
  const [books, setBooks] = useState([]);
  const [subject, setSubject] = useState("fiction");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const url = `https://openlibrary.org/subjects/${subject}.json?limit=12&offset=${
      page * 12
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let works = data.works || [];
        if (sort === "title") {
          works.sort((a, b) => a.title.localeCompare(b.title));
        }
        setBooks(works);
        setLoading(false);
      });
  }, [subject, page, sort]);

  const handleClick = (book) => {
    if (book.key) {
      const id = book.key.split("/").pop();
      navigate(`/book/${id}`);
    }
  };

  return (
    <>
      <div className="browse-page">
        <div className="filters">
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g.replace("_", " ")}
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-msg">📚 Loading books...</div>
        ) : (
          <div className="book-grid">
            {books
              .filter((book) =>
                book.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onClick={() => handleClick(book)}
                />
              ))}
          </div>
        )}

        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
            ⬅ Prev
          </button>
          <span>Page {page + 1}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next ➡</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
