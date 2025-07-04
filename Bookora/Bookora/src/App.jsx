import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import AddBook from "./pages/AddBook";
import BookDetail from './pages/BookDetail';
import MyListings from "./pages/MyListingsPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MyBookDetail from "./components/MyBookDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/my-book/:index" element={<MyBookDetail />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
