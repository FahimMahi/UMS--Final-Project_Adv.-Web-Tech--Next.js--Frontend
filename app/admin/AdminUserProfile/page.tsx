"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Admin = {
  id: string;
  name: string;
  email: string;
  username: string;
  designation: string;
  address: string;
  phoneNumber: string;
  dob: string;
  profilepic: string; // This holds the identifier for the profile picture
  nid: string;
};

const AdminProfile: React.FC = () => {
    const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
        if (!email || !token) {
            // Redirect to Admin Login Page
            window.location.href = '/admin/adminlogin';
            return; // Important to return to avoid executing the rest of the hook
        }
      

      try {
        const url = `http://localhost:3000/admin/findadminbyemail/${email}`;
        const response = await axios.get(url);
        setAdmin(response.data);
      } catch (error) {
        console.error('Failed to fetch admin profile:', error);
        toast.error('Failed to load profile details.');
      }
    };

    fetchAdminProfile();
  }, []);

//   // Construct the image URL using the profilePic identifier
//   const getImageUrl = (profilePicIdentifier: string) => {
//     return `http://localhost:3000/admin/getimage/${profilePicIdentifier}`;
//   };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white">
      {admin ? (
        <div className="space-y-6">
          <div className="text-center">
            {/* Use the getImageUrl function to dynamically generate the image URL */}
            <img src={`http://localhost:3000/admin/getimage/${admin.profilepic}`} alt="Profile"
                 className="mx-auto h-64 w-64 rounded-full object-cover border-4 border-white" />
            <h1 className="text-3xl font-bold">{admin.name}</h1>
            <p className="text-sm text-gray-400">{admin.designation}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Username" value={admin.username} />
            <ProfileField label="Name" value={admin.name} />
            <ProfileField label="Email" value={admin.email} />
            <ProfileField label="Address" value={admin.address} />
            <ProfileField label="Phone Number" value={admin.phoneNumber} />
            <ProfileField label="Date of Birth" value={admin.dob} />
            <ProfileField label="Designation" value={admin.designation} />
            <ProfileField label="NID" value={admin.nid} />
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

export default AdminProfile;
