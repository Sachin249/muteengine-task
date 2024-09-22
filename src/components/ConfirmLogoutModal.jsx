import React from 'react';

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50">
            <div className="bg-white rounded shadow-lg p-6">
                <h2 className="text-lg font-bold text-black">Confirm Logout</h2>
                <p className='text-black'>Are you sure you want to logout?</p>
                <div className="mt-4">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Logout
                    </button>
                    <button 
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLogoutModal;
