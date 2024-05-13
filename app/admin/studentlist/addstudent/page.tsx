"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
    studentId: string;
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    // major: string;
    password: string;
    profilepic: File | null;
    fathersname: string;
    mothersname: string;
    guardianname: string;
    guardianphone: string;
    enrollmentDate: string;
    dob: string;
}

export default function AddStudent() {
    const router = useRouter();
      
    const [formData, setFormData] = useState<FormData>({
        studentId: '',
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        // major: '',
        password:'',
        profilepic: null,
        fathersname: '',
        mothersname: '',
        guardianname: '',
        guardianphone: '',
        enrollmentDate: '',
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
            formDataObject.append('studentId', formData.studentId);
            formDataObject.append('fullName', formData.fullName);
            formDataObject.append('email', formData.email);
            formDataObject.append('address', formData.address);
            formDataObject.append('phoneNumber', formData.phoneNumber);
            // formDataObject.append('major', formData.major);
            formDataObject.append('password', formData.password);
            if (formData.profilepic) {
            formDataObject.append('profilepic', formData.profilepic);
            }
            formDataObject.append('fathersname', formData.fathersname);
            formDataObject.append('mothersname', formData.mothersname);
            formDataObject.append('guardianname', formData.guardianname);
            formDataObject.append('guardianphone', formData.guardianphone);
            formDataObject.append('enrollmentDate', formData.enrollmentDate);
            formDataObject.append('dob', formData.dob);
            console.log(formDataObject);
            const response = await axios.post('http://localhost:3000/admin/createStudent', formDataObject);
            console.log(response.data);
            
            toast.success('New Student Added');
            router.push('/admin/studentlist');
        
        } 
        catch (error) {
            console.error('Error during Add Student:', error);
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

    if (!formData.studentId) {
        errors.studentId = 'Student ID is required';
    }
    else if (!/^\d{2}-\d{5}-\d{1}$/.test(formData.studentId)) {
        errors.studentId = 'Student ID must be in the format XX-XXXXX-X';
    }

    if (!formData.fullName) {
        errors.fullName = 'Full Name is required';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } 
    else if (!/^\d{2}-\d{5}-[1-3]@student\.aiub\.edu$/.test(formData.email)) {
        errors.email = 'Email must be in the format XX-XXXXX-X@student.aiub.edu';
    }

    if (!formData.address) {
        errors.address = 'Address is required';
    }

    if (!formData.phoneNumber) {
        errors.phoneNumber = 'Phone Number is required';
      } else if (!/^01\d{9}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number format. Phone number should be 11 digits starting with 01';
      }

    // if (!formData.major) {
    //     errors.major = 'Major is required';
    // }

    if (!formData.password) {
        errors.password = 'Password is required';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        errors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
      }

    if (!formData.fathersname) {
        errors.fathersname = 'Fathers Name is required';
    }

    if (!formData.mothersname) {
        errors.mothersname = 'Mothers Name is required';
    }

    if (!formData.guardianname) {
        errors.guardianname = 'Guardians Name is required';
    }

    if (!formData.guardianphone) {
        errors.guardianphone = 'Guardian Phone Number is required';
      } else if (!/^01\d{9}$/.test(formData.guardianphone)) {
        errors.guardianphone = 'Invalid phone number format. Phone number should be 11 digits starting with 01';
      }

    

    if (!formData.dob) {
        errors.dob = 'Date of Birth is required';
    }
    

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <center><h1 className="text-3xl font-bold text-white mb-6">Add Student</h1></center>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
    <div className="mb-4">
        <label htmlFor="studentId" className="block text-gray-200 font-bold mb-2">Student ID</label>
        <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.studentId && <p className="text-red-400 text-xs italic">{errors.studentId}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-200 font-bold mb-2">Full Name</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.fullName && <p className="text-red-400 text-xs italic">{errors.fullName}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="email" className="block text-gray-200 font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.email && <p className="text-red-400 text-xs italic">{errors.email}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="address" className="block text-gray-200 font-bold mb-2">Address</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.address && <p className="text-red-400 text-xs italic">{errors.address}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-200 font-bold mb-2">Phone Number</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.phoneNumber && <p className="text-red-400 text-xs italic">{errors.phoneNumber}</p>}
    </div>
    {/* <div className="mb-4">
        <label htmlFor="major" className="block text-gray-200 font-bold mb-2">Major</label>
        <input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.major && <p className="text-red-400 text-xs italic">{errors.major}</p>}
    </div> */}
    <div className="mb-4">
        <label htmlFor="password" className="block text-gray-200 font-bold mb-2">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.password && <p className="text-red-400 text-xs italic">{errors.password}</p>}
    </div>
    <div className="mb-6">
        <label htmlFor="profilepic" className="block text-gray-200 font-bold mb-2">Profile Picture</label>
        <input type="file" id="profilepic" name="profilepic" onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
    </div>
    <div className="mb-4">
        <label htmlFor="fathersname" className="block text-gray-200 font-bold mb-2">Father's Name</label>
        <input type="text" id="fathersname" name="fathersname" value={formData.fathersname} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.fathersname && <p className="text-red-400 text-xs italic">{errors.fathersname}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="mothersname" className="block text-gray-200 font-bold mb-2">Mother's Name</label>
        <input type="text" id="mothersname" name="mothersname" value={formData.mothersname} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.mothersname && <p className="text-red-400 text-xs italic">{errors.mothersname}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="guardianname" className="block text-gray-200 font-bold mb-2">Guardian's Name</label>
        <input type="text" id="guardianname" name="guardianname" value={formData.guardianname} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.guardianname && <p className="text-red-400 text-xs italic">{errors.guardianname}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="guardianphone" className="block text-gray-200 font-bold mb-2">Guardian Phone</label>
        <input type="text" id="guardianphone" name="guardianphone" value={formData.guardianphone} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.guardianphone && <p className="text-red-400 text-xs italic">{errors.guardianphone}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="enrollmentDate" className="block text-gray-200 font-bold mb-2">Enrollment Date</label>
        <input type="date" id="enrollmentDate" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.enrollmentDate && <p className="text-red-400 text-xs italic">{errors.enrollmentDate}</p>}
    </div>
    <div className="mb-4">
        <label htmlFor="dob" className="block text-gray-200 font-bold mb-2">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} 
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
        {errors.dob && <p className="text-red-400 text-xs italic">{errors.dob}</p>}
    </div>
    <div className="flex items-center justify-center mt-6">
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Student
        </button>
    </div>
</form>

    </div>

  );
};

