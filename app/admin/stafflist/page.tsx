"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define a type for the staff data
type Staff = {
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
};

const StaffProfileList: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) {
      // Redirect to Staff Login Page
      window.location.href = '/admin/adminlogin';
      return; // Important to return to avoid executing the rest of the hook
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/admin/staffprofilelist");
      if (Array.isArray(response.data.result)) {
        setStaffs(response.data.result);
        setFilteredStaffs(response.data.result);
      } else {
        console.error('Expected an array but received:', response.data);
        setStaffs([]);
        setFilteredStaffs([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = staffs.filter(staff =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchTerm, staffs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/removeStaff/${id}`);
      toast.success('Staff deleted successfully!');
      setStaffs(prevStaff => prevStaff.filter(staff => staff.id !== id));
    } catch (error) {
      console.error("Error deleting staff member:", error);
      toast.error('Failed to delete staff.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/stafflist/update/${id}`);
  };
  
  const handleAddStaff = () => {
    router.push('/admin/stafflist/addstaff');
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Staff List</h1></center>
        <button onClick={handleAddStaff} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded">Add Staff</button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 p-2 border rounded text-black"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Profile</th>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">Designation</th>
              <th scope="col" className="py-3 px-6">Address</th>
              <th scope="col" className="py-3 px-6">NID</th>
              <th scope="col" className="py-3 px-6">Phone Number</th>
              <th scope="col" className="py-3 px-6">DOB</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.map((staff, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">
                  <img src={`http://localhost:3000/admin/getstaffimage/${staff.profilepic}`} alt="Profile Pic" style={{ width: "50px", height: "50px", borderRadius: "25px" }} />
                </td>
                <td className="py-4 px-6">{staff.id}</td>
                <td className="py-4 px-6">{staff.name}</td>
                <td className="py-4 px-6">{staff.email}</td>
                <td className="py-4 px-6">{staff.username}</td>
                <td className="py-4 px-6">{staff.designation}</td>
                <td className="py-4 px-6">{staff.address}</td>
                <td className="py-4 px-6">{staff.nid}</td>
                <td className="py-4 px-6">{staff.phoneNumber}</td>
                <td className="py-4 px-6">{staff.dob}</td>
                <td className="py-4 px-6">
                  {/* <button onClick={() => handleEdit(staff.id)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition duration-300">Edit</button> */}
                  <button onClick={() => handleDelete(staff.id)}  className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md transition duration-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffProfileList;
