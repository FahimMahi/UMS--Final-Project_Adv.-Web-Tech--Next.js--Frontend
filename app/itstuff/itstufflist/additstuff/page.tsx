"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  fullName: string;
  age: number;
  status: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
}

export default function AddITStaff() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: 0,
    status: '',
    address: '',
    email: '',
    password: '',
    gender: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');

    if (!storedEmail || !storedToken) {
      router.push('/itstuff/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/it-stuff/create', formData);
        console.log(response.data);

        toast.success('New IT Staff Added');
        router.push('/itstuff/stafflist');

      } catch (error) {
        console.error('Error during Add IT Staff:', error);
        toast.error('Failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.fullName) {
      errors.fullName = 'Full Name is required';
    }


    if (!formData.status) {
      errors.status = 'Status is required';
    }

    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    return errors;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <center><h1 className="text-3xl font-bold text-white mb-6">Add IT Staff</h1></center>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-200 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.fullName && <p className="text-red-400 text-xs italic">{errors.fullName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-200 font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.age && <p className="text-red-400 text-xs italic">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-200 font-bold mb-2">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.status && <p className="text-red-400 text-xs italic">{errors.status}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-200 font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.address && <p className="text-red-400 text-xs italic">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-200 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-400 text-xs italic">{errors.email}</p>}
        </div><div className="mb-4">
          <label htmlFor="password" className="block text-gray-200 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-400 text-xs italic">{errors.password}</p>}
        </div>
       
       <div className="mb-4">
         <label htmlFor="gender" className="block text-gray-100 text-sm font-bold mb-2">Gender</label>
         <input
           type="gender"
           id="gender"
           name="gender"
           value={formData.gender}
           onChange={handleInputChange}
           className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
           placeholder="Enter your phone number"
         />
         {errors.gender && <p className="text-red-400 text-xs italic">{errors.gender}</p>}
       </div>


        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-100 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-400 text-xs italic">{errors.phoneNumber}</p>}
        </div>

        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add IT Staff
          </button>
        </div>
      </form>
      </div>    </div>
  );
};
