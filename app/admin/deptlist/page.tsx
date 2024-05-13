"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define a type for the department data
type Department = {
  id: string;
  name: string;
  degree: string;
};

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) {
      // Redirect to Admin Login Page
      window.location.href = '/admin/adminlogin';
      return; // Important to return to avoid executing the rest of the hook
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/admin/deptlist");
      if (Array.isArray(response.data.result)) {
        setDepartments(response.data.result);
        setFilteredDepartments(response.data.result);
      } else {
        console.error('Expected an array but received:', response.data);
        setDepartments([]);
        setFilteredDepartments([]);
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
    const filtered = departments.filter(department =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/removedept/${id}`);
      toast.success('Department deleted successfully!');
      setDepartments(prevDept => prevDept.filter(dept => dept.id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error('Failed to delete department.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/deptlist/update/${id}`);
  };

  const handleAddDepartment = () => {
    router.push('/admin/deptlist/adddepartment');
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Department List</h1></center>
        <button onClick={handleAddDepartment} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded">Add Department</button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 p-2 border rounded text-black" // Added text-black here
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Degree</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map((department, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{department.id}</td>
                <td className="py-4 px-6">{department.name}</td>
                <td className="py-4 px-6">{department.degree}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(department.id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDelete(department.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentList;
