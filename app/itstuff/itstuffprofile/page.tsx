"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type ITStuff = {
  id: string;
  fullName: string;
  age: number;
  status: string;
  address: string;
  email: string;
  gender: string;
  phoneNumber: string;
  profilePicture: string; // This holds the identifier for the profile picture
};

interface Props {
  id: string;
}

const ITStuffProfile: React.FC<Props> = ({ id }) => {
  const [itStuff, setITStuff] = useState<ITStuff | null>(null);

  useEffect(() => {
    const fetchITStuffProfile = async () => {
      try {
        const url = `http://localhost:3000/it-stuff/:id`;
        const response = await axios.get<ITStuff>(url);
        setITStuff(response.data);
      } catch (error) {
        console.error('Failed to fetch ITStuff profile:', error);
        toast.error('Failed to load profile details.');
      }
    };

    fetchITStuffProfile();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white">
      {itStuff ? (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{itStuff.fullName}</h1>
            <p className="text-sm text-gray-400">{itStuff.status}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Full Name" value={itStuff.fullName} />
            <ProfileField label="Age" value={itStuff.age.toString()} />
            <ProfileField label="Gender" value={itStuff.gender} />
            <ProfileField label="Address" value={itStuff.address} />
            <ProfileField label="Email" value={itStuff.email} />
            <ProfileField label="Phone Number" value={itStuff.phoneNumber} />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">Loading profile...</p>
      )}
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

export default ITStuffProfile;
