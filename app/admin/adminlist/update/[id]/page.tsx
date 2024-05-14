"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define a type for the admin data
type Admin = {
  id: string;
  name: string;
  email: string;
  username: string;
  designation: string;
  address: string;
  nid: string;
  phoneNumber: string;
  dob: string;
  profilepic: string;
  password: string; // Include password in the type definition

};

const EditAdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only execute this code on the client-side
    if (typeof window !== 'undefined') {
      const urlSegments = window.location.pathname.split('/');
      const id = urlSegments[urlSegments.length - 1]; // Assuming the ID is the last segment

      if (!id) {
        toast.error('Admin ID not found.');
        return;
      }

      const fetchAdminData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/admin/findadminbyid/${id}`);
          setAdmin(response.data);
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
          toast.error("Error loading admin details");
        }
      };

      fetchAdminData();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value } as Admin));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!admin) return;

    console.log("Submitting admin data:", admin); // Add this line to log the admin data

    if (typeof window !== 'undefined') {
        const urlSegments = window.location.pathname.split('/');
        const id = urlSegments[urlSegments.length - 1];

        try {
            await axios.put(`http://localhost:3000/admin/updateadmin/${id}`, admin);
            toast.success('Admin updated successfully!');
            router.push('/admin/adminlist');
        } catch (error) {
            console.error("Error updating admin:", error);
            toast.error('Failed to update admin.');
        }
    }
};


  if (!admin) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Admin Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Form inputs as previous, ensure all fields are included and handled */}
        {/* Example for one input field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" value={admin.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input type="text" id="username" name="username" value={admin.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" value={admin.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
          <input type="text" id="designation" name="designation" value={admin.designation} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <textarea id="address" name="address" value={admin.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" value={admin.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="nid" className="block text-gray-700 text-sm font-bold mb-2">NID</label>
          <input type="text" id="nid" name="nid" value={admin.nid} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={admin.phoneNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={admin.dob} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Admin
        </button>
      </form>
    </div>
  );
};

export default EditAdminProfile;
