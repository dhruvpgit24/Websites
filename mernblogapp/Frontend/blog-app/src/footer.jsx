import React from 'react'
import './footer.css';
import logo from './images/logo.svg';
const Footer = () => {
  return (
    <div className="footer-container">
         <div className="footer-links">
        <div className="footer-column" id='fc1'>
          <h3><img src={logo} alt="" /></h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat
            eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        <div className="footer-column" id='fc2'>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Best Sellers</li>
            <li>Offers & Deals</li>
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-column" id='fc3'>
          <h4>Need Help?</h4>
          <ul>
            <li>Delivery Information</li>
            <li>Return & Refund Policy</li>
            <li>Payment Methods</li>
            <li>Track your Order</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Meshwa Shah - All Right Reserved.</p>
      </div>
    
    </div>
  )
}

export default Footer