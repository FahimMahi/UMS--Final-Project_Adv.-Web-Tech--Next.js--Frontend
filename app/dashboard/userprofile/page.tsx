"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
const TeacherProfile: React.FC = () => {
    const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
        const email = localStorage.getItem('email');
        if (!email) {
          window.location.href = '/signin';
          return; 
        }
      
        const user = teacher?.username;
        try {
            const url = `http://localhost:3000/teacher/getUser/${user}`;
            const response = await axios.get(url);
            setTeacher(response.data);
        } catch (error) {
            console.error('Failed to fetch teacher profile:', error);
            toast.error('Failed to load profile details.');
        }
    };

    fetchTeacherProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white">
      {teacher ? (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{teacher.username}</h1>
            <p className="text-sm text-gray-400">{teacher.department}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Username" value={teacher.username} />
            <ProfileField label="Fullname" value={teacher.fullName} />
            <ProfileField label="Email" value={teacher.email} />
            <ProfileField label="Address" value={teacher.address} />
            <ProfileField label="Phone Number" value={teacher.phoneNumber} />
            <ProfileField label="Department" value={teacher.department} />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">Loading profile...</p>
      )}<br/>
    </div>
  );
};

type ProfileFieldProps = {
  label: string;
  value: string;
};

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <div>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p>{value}</p>
  </div>
);

export default TeacherProfile;
