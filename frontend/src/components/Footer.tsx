import React from 'react';
import './Footer.css'; // Make sure to create this CSS file for styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Easy find market.</p>
        <nav className="footer-nav">
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
