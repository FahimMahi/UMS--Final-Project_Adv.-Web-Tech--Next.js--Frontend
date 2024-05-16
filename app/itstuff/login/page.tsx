"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

export default function ITStaffLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    // Redirect if token and email are found in localStorage
    if (token && email) {
      window.location.href = '/itstuff/itstuff-dashboard';
      return; 
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.password) {
      toast.error('Please fill out all fields');
      return;
    }

    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }

    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/it-stuff/login', formData);
      const { access_token } = response.data;

      console.log(response.data);

      localStorage.setItem('token', access_token);
      localStorage.setItem('email', formData.email);

      toast.success('Login Successful');
      window.location.href = '/itstuff/itstuff-dashboard';
      return; 
    } catch (error) {
      console.error('Error Login:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-700 p-8 shadow-lg rounded-lg">
          <div>
            <Toaster />
            <h2 className="text-center text-3xl font-bold text-white">Login</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email"
                className="bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@example.com" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password"
                className="bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="••••••••" value={formData.password} onChange={handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" name="remember" type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-500 focus:ring-blue-500"
                  onChange={handleChange} />
                <label htmlFor="remember" className="ml-2 block text-sm text-white">Remember me</label>
              </div>
              {<a href="reset-password" className="text-sm text-blue-500 hover:underline">Reset your password?</a>}
            </div>
            <button type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
