import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>📚 Bookora</h2>
        <p>Old books. New stories. Shared journeys.</p>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bookora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
