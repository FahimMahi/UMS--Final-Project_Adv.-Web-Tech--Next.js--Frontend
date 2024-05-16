"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  profilePicture: string | null;
};

const ITStuffList: React.FC = () => {
  const [itStuff, setITStuff] = useState<ITStuff[]>([]);
  const [filteredITStuff, setFilteredITStuff] = useState<ITStuff[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/it-stuff");
      console.log("Response from API:", response.data);
      if (Array.isArray(response.data)) {
        setITStuff(response.data);
        setFilteredITStuff(response.data);
      } else {
        console.error('Expected an array but received:', response.data);
        toast.error('Error fetching data');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = itStuff.filter(item =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredITStuff(filtered);
  }, [searchTerm, itStuff]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this IT stuff member?")) return;
    try {
      await axios.delete(`http://localhost:3000/it-stuff/itstaffdelete/${id}`);
      toast.success('IT stuff member deleted successfully!');
      setITStuff(prevITStuff => prevITStuff.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting IT stuff member:", error);
      toast.error('Failed to delete IT stuff member.');
    }
  };

  const handleAddITStuff = () => {
    router.push('/itstuff/itstufflist/additstuff');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white p-4">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">IT Stuff List</h1></center>
          <div className="flex justify-center mt-4">
            <button onClick={handleAddITStuff} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded mr-4">Add IT Stuff</button>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded text-black"
            />
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm text-left mt-4 bg-white">
            <thead className="text-xs uppercase">
              <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
                <th scope="col" className="py-3 px-6">Full Name</th>
                <th scope="col" className="py-3 px-6">Age</th>
                <th scope="col" className="py-3 px-6">Status</th>
                <th scope="col" className="py-3 px-6">Address</th>
                <th scope="col" className="py-3 px-6">Email</th>
                <th scope="col" className="py-3 px-6">Gender</th>
                <th scope="col" className="py-3 px-6">Phone Number</th>
                <th scope="col" className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredITStuff.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-400">
                  <td className="py-4 px-6">{item.fullName}</td>
                  <td className="py-4 px-6">{item.age}</td>
                  <td className="py-4 px-6">{item.status}</td>
                  <td className="py-4 px-6">{item.address}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.gender}</td>
                  <td className="py-4 px-6">{item.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleDelete(item.id)} className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md transition duration-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ITStuffList;
