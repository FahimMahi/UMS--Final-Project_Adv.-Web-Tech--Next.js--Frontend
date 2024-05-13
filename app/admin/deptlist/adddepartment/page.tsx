"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface DepartmentData {
  name: string;
  degree: string;
}

export default function AddDepartment() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<DepartmentData>({
    name: '',
    degree: '',
  });
  const [errors, setErrors] = useState<Partial<DepartmentData>>({});

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (!email || !token) {
      router.push('/admin/adminlogin');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/admin/addDepartment', formData);
        toast.success('Department added successfully');
        router.push('/admin/deptlist');
      } catch (error) {
        console.error('Error during Add Department:', error);
        toast.error('Failed to add department. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data: DepartmentData): Partial<DepartmentData> => {
    const errors: Partial<DepartmentData> = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.degree) errors.degree = 'Degree is required';
    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <center><h1 className="text-3xl font-bold text-white mb-6">Add Department</h1></center>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-200 font-bold mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-400 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="degree" className="block text-gray-200 font-bold mb-2">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.degree && <p className="text-red-400 text-xs italic">{errors.degree}</p>}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Department
          </button>
        </div>
      </form>
    </div>
  );
}
