import React, { useEffect, useState } from "react";
import "../styles/Herosection.css";

const quotes = [
  "Old Books, New Beginnings.",
  "Where Old Books Find New Homes.",
  "One Book. Endless Feelings.",
  "Turn Pages. Save Cash. Repeat.",
  "Silent Pages. Loud Memories."
];

const Herosection = () => {
  const [text, setText] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = quotes[quoteIndex];
    let typingSpeed = isDeleting ? 40 : 100;

    const type = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setQuoteIndex((prev) => (prev + 1) % quotes.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(type);
  }, [charIndex, isDeleting, quoteIndex]);

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="promo">📚 Simplify Book Buying & Selling</p>
        <h1 className="quote-line">
          {text}
          <span className="cursor">|</span>
        </h1>
        <p className="subtext">
          A smart platform to help students buy, sell, or exchange used books
          with ease. Save money, declutter shelves, and connect with nearby
          learners.
        </p>
        <div className="hero-buttons">
          <button className="explore-btn">Explore Now</button>
        </div>
      </div>

      <div className="hero-images">
        <img src="/images/book.jpg" className="book book1" alt="Book 1" />
        <img src="/images/book3.jpg" className="book book2" alt="Book 3" />
        <img src="/images/book2.jpg" className="book book2" alt="Book 2" />
      </div>
    </section>
  );
};

export default Herosection;
