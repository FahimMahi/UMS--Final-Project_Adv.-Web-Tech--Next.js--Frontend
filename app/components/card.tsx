// components/Card.tsx
import React from 'react';

type Teacher = {
    username: string,
    email: string,
    fullName: string,
    department: string,
    address: string,
    phoneNumber: string,
};

type CardProps = {
    user: Teacher,
    onDelete: (username: string) => void,
};

const Card: React.FC<CardProps> = ({ user, onDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <p className="font-bold text-lg mb-2">Username: {user.username}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-gray-700"><span className="font-semibold">Full Name:</span> {user.fullName}</p>
            <p className="text-gray-700"><span className="font-semibold">Department:</span> {user.department}</p>
            <p className="text-gray-700"><span className="font-semibold">Address:</span> {user.address}</p>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>
            <div className="flex justify-between mt-4">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => onDelete(user.username)}>Delete</button>
            </div>
        </div>
    );
};

export default Card;
