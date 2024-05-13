"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define a type for the student data
type Student = {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  major: string;
  gpa: number;
  graduationDate: string;
  profilepic: string;
  fathersName: string;
  mothersName: string;
  guardianName: string;
  guardianPhone: string;
  enrollmentDate: string;
  dob: string;
};

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) {
      // Redirect to Student Login Page
      window.location.href = '/admin/adminlogin';
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/admin/studentprofilelist");
      if (Array.isArray(response.data.result)) {
        setStudents(response.data.result);
        setFilteredStudents(response.data.result);
      } else {
        console.error('Expected an array but received:', response.data);
        setStudents([]);
        setFilteredStudents([]);
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
    const filtered = students.filter(student =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/removestudent/${id}`);
      toast.success('Student deleted successfully!');
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error('Failed to delete student.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/studentlist/updatestudent/${id}`);
  };
  
  const handleAddStudent = () => {
    router.push('/admin/studentlist/addstudent');
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <center><h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Student List</h1></center>
        <button onClick={handleAddStudent} className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded">Add Student</button>
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
              <th scope="col" className="py-3 px-6">Student ID</th>
              <th scope="col" className="py-3 px-6">Full Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Address</th>
              <th scope="col" className="py-3 px-6">Phone Number</th>
              <th scope="col" className="py-3 px-6">Major</th>
              <th scope="col" className="py-3 px-6">GPA</th>
              <th scope="col" className="py-3 px-6">DOB</th>
              <th scope="col" className="py-3 px-6">Enrollment Date</th>
              <th scope="col" className="py-3 px-6">Graduation Date</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">
                  <img src={`http://localhost:3000/admin/getstudentimage/${student.profilepic}`} alt="Profile Pic" style={{ width: "50px", height: "50px", borderRadius: "25px" }} />
                </td>
                <td className="py-4 px-6">{student.studentId}</td>
                <td className="py-4 px-6">{student.fullName}</td>
                <td className="py-4 px-6">{student.email}</td>
                <td className="py-4 px-6">{student.address}</td>
                <td className="py-4 px-6">{student.phoneNumber}</td>
                <td className="py-4 px-6">{student.major}</td>
                <td className="py-4 px-6">{student.gpa}</td>
                <td className="py-4 px-6">{student.dob}</td>
                <td className="py-4 px-6">{student.enrollmentDate}</td>
                <td className="py-4 px-6">{student.graduationDate}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(student.id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
