"use client";

import React, { useState } from 'react';
import AllUser from './allUser/page';
import Logout from '../components/logout';
import axios from 'axios';

type Teacher = {
    username: string,
    email: string,
    password: string,
    fullName: string,
    department: string,
    uploadCV: File | null,
    address: string,
    phoneNumber: string,
};

export default function Dashboard() {
    const [activeComponent, setActiveComponent] = useState<string>('allUser');
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState<Teacher | null>(null);

    const renderContent = () => {
        switch (activeComponent) {
            case 'allUser':
                return <AllUser />;
            case 'updateuser':
            default:
                return <div>Dashboard Content</div>;
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/teacher/getUser/${searchQuery}`);
            setUserData(response.data); // Assuming response.data contains user information
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(null);
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="sidebar-toggle" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search username..."
                            className="p-2 border border-gray-300 rounded-lg mr-2"
                        />
                        <button onClick={handleSearch} className="btn btn-primary">Search</button>
                    </div>
                    {userData ? (
                        <div className="card p-4">
                            <h2>User Information</h2>
                            <p>Username: {userData.username}</p>
                            <p>Email: {userData.email}</p>
                            <p>Address: {userData.address}</p>
                            <p>Phone: {userData.phoneNumber}</p>
                            {/* Display other user information here */}
                        </div>
                    ) : (
                        <div>No user found</div>
                    )}
                </div>

                <div className="p-4 w-full">
                    {renderContent()}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="sidebar-toggle" className="drawer-overlay" aria-label="close sidebar"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li><a href="" onClick={() => setActiveComponent('allUser')}>All Users</a></li>
                    <li><a href="/dashboard/updateuser" onClick={() => setActiveComponent('updateuser')}>Update User</a></li>
                    <li><Logout/></li>
                </ul>
            </div>
        </div>
    );
}
