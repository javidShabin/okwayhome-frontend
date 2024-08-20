import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E2C] text-[#F5F5F5] py-10">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo & About Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">
              OkwayHome
            </Link>
            <p className="mt-4 text-sm">
              Transform your space with style and elegance. At Okway Home
              Decore, we offer the finest selection of furniture and decor to
              elevate your home.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E0A96D]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E0A96D]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/furnitures" className="hover:text-[#E0A96D]">
                  Furnitures
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E0A96D]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E0A96D]"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E0A96D]"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E0A96D]"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-600 pt-6 text-center text-sm">
          <p>© 2024 Okway Home Decore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
