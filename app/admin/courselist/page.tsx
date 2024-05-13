"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define a type for the course data
type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
};

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
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
      const response = await axios.get("http://localhost:3000/admin/courselist");
      if (Array.isArray(response.data.result)) {
        setCourses(response.data.result);
        setFilteredCourses(response.data.result);
      } else {
        console.error('Expected an array but received:', response.data);
        setCourses([]);
        setFilteredCourses([]);
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
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/removecourse/${id}`);
      toast.success('Course deleted successfully!');
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error('Failed to delete course.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/courselist/update/${id}`);
  };

  const handleAddCourse = () => {
    router.push('/admin/courselist/addcourse');
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Course List</h1></center>
        <button onClick={handleAddCourse} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded">Add Course</button>
        <input
          type="text"
          placeholder="Search by title..."
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
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Code</th>
              <th scope="col" className="py-3 px-6">Title</th>
              <th scope="col" className="py-3 px-6">Credits</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{course.id}</td>
                <td className="py-4 px-6">{course.code}</td>
                <td className="py-4 px-6">{course.title}</td>
                <td className="py-4 px-6">{course.credits}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(course.id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;
