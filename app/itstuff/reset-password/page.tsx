
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword: React.FC = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/it-stuff/${id}/reset-password`);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="mb-6">
          <div className="mb-6">
            <label htmlFor="id" className="block text-gray-700 font-semibold mb-2">User ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter user ID"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-500 text-white font-semibold p-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
            disabled={loading}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
