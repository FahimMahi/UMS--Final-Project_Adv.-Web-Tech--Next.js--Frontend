"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type Student = {
  id: string;
  name: string;
  semester: string;
};

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/it-stuff/getAllStudent");
      console.log('API response:', response.data); // Log API response

      if (Array.isArray(response.data.result)) {
        const simplifiedStudents = response.data.result.map((student: any) => ({
          id: student.id,
          name: student.fullName,
          semester: student.semester,
        }));
        console.log('Simplified students:', simplifiedStudents); // Log simplified students
        setStudents(simplifiedStudents);
        setFilteredStudents(simplifiedStudents);
      } else {
        console.error('Expected an array but received:', response.data);
        setStudents([]);
        setFilteredStudents([]);
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
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered students:', filtered); // Log filtered students
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:3000/it-stuff/studentdelete/${id}`);
      toast.success('Student deleted successfully!');
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error('Failed to delete student.');
    }
  };

  const handleAddStudent = () => {
    router.push('/itstuff/studentlist/addstudent');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Student List</h1></center>
        <div className="flex justify-center items-center mt-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 p-2 border rounded text-black"
          />
          <button onClick={handleAddStudent} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded ml-4">Add Student</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Student ID</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Semester</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{student.id}</td>
                <td className="py-4 px-6">{student.name}</td>
                <td className="py-4 px-6">{student.semester}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDelete(student.id)} className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md transition duration-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div></div>
  );
};

export default StudentList;
