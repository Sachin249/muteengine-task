import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage404 = () => {
    const navigate=useNavigate()
  return (

    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-secondary">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-lg">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
          Go Back Home
        </Link>
      </div>
    </div>
    </>
  );
};

export default ErrorPage404;
