import React from 'react';

const ApiLoader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-primary h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default ApiLoader;
