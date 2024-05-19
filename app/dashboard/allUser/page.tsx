"use client";

import Card from "@/app/components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


type Teacher = {
    username: string,
    email: string,
    fullName: string,
    department: string,
    address: string,
    phoneNumber: string,
};

export default function AllUser() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:3000/teacher/allUsers");
                setTeachers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (username: string) => {
        if (!confirm("Are you sure you want to delete this teacher?")) return;
        try {
            await axios.delete(`http://localhost:3000/teacher/deleteUser/${username}`);
            toast.success('Teacher deleted successfully!');
           
            setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.username !== username));
        } catch (error) {
            console.error("Error deleting teacher:", error);
            toast.error('Failed to delete teacher.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((user) => (
                    <Card key={user.username} user={user} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}
