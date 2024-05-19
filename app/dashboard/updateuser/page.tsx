"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Update() {
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [teacherData, setTeacherData] = useState({
    email: '',
    password:'',
    fullName: '',
    department: '',
    address: '',
    phoneNumber: ''
  });

  const checkUserExists = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/teacher/getUser/${username}`);
      if (response.data) {
        setUserExists(true);
        setTeacherData({
          email: response.data.email,
          password: response.data.password,
          fullName: response.data.fullName,
          department: response.data.department,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber
        });
      } else {
        setUserExists(false);
        alert('User does not exist');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      alert('Error checking user');
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/teacher/updateUser/${username}`, teacherData);
      if (response.status === 200) {
        alert('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={checkUserExists}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Check Username
        </button>
      </div>
      {userExists && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={teacherData.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">Password:</label>
            <input
              type="password"
              name="password"
              value={teacherData.password}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={teacherData.fullName}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">Department:</label>
            <input
              type="text"
              name="department"
              value={teacherData.department}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">Address:</label>
            <input
              type="text"
              name="address"
              value={teacherData.address}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={teacherData.phoneNumber}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2">
            Update User
          </button>
        </form>
      )}
    </div>
  );
}
