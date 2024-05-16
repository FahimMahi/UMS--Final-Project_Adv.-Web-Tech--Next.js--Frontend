"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface SignupFormData {
  fullName: string;
  age: number;
  status: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  profilePicture: string | null;
}

export default function ITStaffSignup() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    age: 0,
    status: 'active',
    address: '',
    email: '',
    password: '',
    gender: '',
    phoneNumber: '',
    profilePicture: null
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/it-stuff/signup', formData);
      console.log(response.data);
      toast.success('Signup Successful');
      // Redirect or perform other actions after successful signup
    } catch (error) {
      console.error('Error Signup:', error);
      toast.error('Signup failed. Please try again later.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-700 p-8 shadow-lg rounded-lg">
          <div>
            <Toaster />
            <h2 className="text-center text-3xl font-bold text-white">Sign Up</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
              <input id="fullName" name="fullName" type="text"
                className="bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
            </div>
            {/* Add more fields for age, status, address, email, password, gender, phoneNumber, and profilePicture */}
            <button type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
