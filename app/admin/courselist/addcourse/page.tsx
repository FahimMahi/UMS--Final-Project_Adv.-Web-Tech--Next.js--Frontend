"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface CourseData {
  code: string;
  title: string;
  credits: number;
}

export default function AddCourse() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<CourseData>({
    code: '',
    title: '',
    credits: 0,
  });
  const [errors, setErrors] = useState<Partial<CourseData>>({});

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (!email || !token) {
      router.push('/admin/adminlogin');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'credits') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/admin/createCourse', formData);
        toast.success('Course added successfully');
        router.push('/admin/courselist');
      } catch (error) {
        console.error('Error during Add Course:', error);
        toast.error('Failed to add course. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data: CourseData): Partial<CourseData> => {
    const errors: Partial<CourseData> = {};
    if (!data.code) errors.code = 'Code is required';
    if (!data.title) errors.title = 'Title is required';
    // if (data.credits <= 0) errors.credits = 'Credits must be greater than zero';
    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <center><h1 className="text-3xl font-bold text-white mb-6">Add Course</h1></center>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-200 font-bold mb-2">
            Course Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.code && <p className="text-red-400 text-xs italic">{errors.code}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-200 font-bold mb-2">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.title && <p className="text-red-400 text-xs italic">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="credits" className="block text-gray-200 font-bold mb-2">
            Credits
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={formData.credits}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.credits && <p className="text-red-400 text-xs italic">{errors.credits}</p>}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
