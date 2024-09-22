import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Importing icons
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">About E-Shop</h3>
          <p className="text-gray-200">
            E-Shop offers the best products at unbeatable prices. Shop now for
            the latest trends.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
                <li>
                    <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-300' : 'hover:text-gray-300'
                    }
                    >
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-300' : 'hover:text-gray-300'
                    }
                    >
                    About Us
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-300' : 'hover:text-gray-300'
                    }
                    >
                    Contact Us
                    </NavLink>
                </li>
                
            </ul>

        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-400 mt-8 pt-4 text-center">
        <p className="text-gray-300">&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
