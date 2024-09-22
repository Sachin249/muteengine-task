import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    toast.success('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <>
    
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Got a question or need support? We’re here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-light transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center bg-gray-100 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">Contact Information</h2>
            <div className="mb-6">
              <p className="text-lg text-gray-700 font-semibold">Email Us:</p>
              <p className="text-gray-600">support@eshop.com</p>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-700 font-semibold">Call Us:</p>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
            <div>
              <p className="text-lg text-gray-700 font-semibold">Visit Us:</p>
              <p className="text-gray-600">123 E-Shop Lane, Commerce City</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  
    </>
  );
};

export default ContactUs;
