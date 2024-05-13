"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  name: string;
  username:string;
  address: string;
  phoneNumber: string;
  email: string;
  designation: string;
  password: string;
  nid: string;
  profilepic: File | null;
  dob: string;
}

export default function AddFaculty() {
    const router = useRouter();
      
    const [formData, setFormData] = useState<FormData>({
        name: '',
        username: '',
        address: '',
        phoneNumber: '',
        email: '',
        designation: '',
        password: '',
        nid: '',
        profilepic: null,
        dob: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Access localStorage only after the component has mounted
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('token');
    
        if (!storedEmail || !storedToken) {
          // Redirect to Admin Login Page if no email or token is stored
          router.push('/admin/adminlogin');
        } else {
          setEmail(storedEmail);
          setToken(storedToken);
        }
      }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
        try {
            const formDataObject = new FormData();
            formDataObject.append('name', formData.name);
            formDataObject.append('username', formData.username);
            formDataObject.append('address', formData.address);
            formDataObject.append('phoneNumber', formData.phoneNumber);
            formDataObject.append('email', formData.email);
            formDataObject.append('designation', formData.designation);
            formDataObject.append('password', formData.password);
            formDataObject.append('nid', formData.nid);
            if (formData.profilepic) {
            formDataObject.append('profilepic', formData.profilepic);
            }
            formDataObject.append('dob', formData.dob);
            console.log(formDataObject);
            const response = await axios.post('http://localhost:3000/admin/createFaculty', formDataObject);
            console.log(response.data);
            
            toast.success('New Faculty Added');
            router.push('/admin/facultylist');
        
        } 
        catch (error) {
            console.error('Error during Add Faculty:', error);
            toast.error('Failed. Please try again.');
        }
        } 
        else {
        setErrors(validationErrors);
        }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.username) {
      errors.username = 'Username is required';
    }

    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^01\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format. Phone number should be 11 digits starting with 01';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^@\s]+@aiub\.edu$/.test(formData.email)) {
      errors.email = 'Email must be an AIUB email address (example@aiub.edu)';
    }

    
    if (!formData.designation) {
      errors.designation = 'designation is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }


    if (!formData.nid) {
      errors.nid = 'NID is required';
    } else if (!/^\d{10}$/.test(formData.nid)) {
      errors.nid = 'Invalid Bangladeshi NID number format. NID must be exactly 10 digits';
    }

    
    if (!formData.dob) {
      errors.dob = 'DOB is required';
    }
    

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <center><h1 className="text-3xl font-bold text-white mb-6">Add Faculty</h1></center>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-200 font-bold mb-2">
                    Name
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
                <label htmlFor="username" className="block text-gray-200 font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.username && <p className="text-red-400 text-xs italic">{errors.username}</p>}
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
                <label htmlFor="phoneNumber" className="block text-gray-200 font-bold mb-2">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs italic">{errors.phoneNumber}</p>}
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
            </div>
            <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-200 font-bold mb-2">
                    Designation
                </label>
                <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.designation && <p className="text-red-400 text-xs italic">{errors.designation}</p>}
            </div>
            <div className="mb-4">
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
                <label htmlFor="nid" className="block text-gray-200 font-bold mb-2">
                    National ID
                </label>
                <input
                    type="text"
                    id="nid"
                    name="nid"
                    value={formData.nid}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.nid && <p className="text-red-400 text-xs italic">{errors.nid}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="profilepic" className="block text-gray-200 font-bold mb-2">
                    Profile Picture
                </label>
                <input
                    type="file"
                    id="profilepic"
                    name="profilepic"
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-200 font-bold mb-2">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.dob && <p className="text-red-400 text-xs italic">{errors.dob}</p>}
            </div>
            <div className="flex items-center justify-center mt-6"> {/* Adjusted for centering the button */}
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Faculty
            </button>
            </div>
        </form>
    </div>

  );
};

