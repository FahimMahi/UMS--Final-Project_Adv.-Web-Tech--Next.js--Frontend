"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface AdminData {
  id: string;
}

interface StudentData {
  id: string;
}

interface FacultyData {
  id: string;
}

interface StaffData {
  id: string;
}

interface DeptData {
  id: string;
}

interface CourseData {
  id: string;
}

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
  const [staffData, setStaffData] = useState<StaffData[]>([]);
  const [DeptData, setDeptData] = useState<DeptData[]>([]);
  const [CourseData, setCourseData] = useState<CourseData[]>([]);
  
  // Assuming 'email' is stored in local storage, make sure to access it only client-side
  const [username, setUsername] = useState<string>('Admin');

  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
    setUsername(email ? email.split('@')[0] : 'Admin');
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      
      if (!email || !token) {
        // Redirect to Admin Login Page
        window.location.href = '/admin/adminlogin';
        return; // Important to return to avoid executing the rest of the hook
      }
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const fetchData = async () => {
        try {
          const adminResponse = await axios.get("http://localhost:3000/admin/search/getAllAdmin", config);
          setAdminData(adminResponse.data);
          const studentResponse = await axios.get("http://localhost:3000/admin/search/getAllStudent", config);
          setStudentData(studentResponse.data);
          const facultyResponse = await axios.get("http://localhost:3000/admin/search/getAllFaculty", config);
          setFacultyData(facultyResponse.data);
          const StaffResponse = await axios.get("http://localhost:3000/admin/search/getAllStaff", config);
          setStaffData(StaffResponse.data);
          const DeptResponse = await axios.get("http://localhost:3000/admin/search/getAllDepartmentList", config);
          setDeptData(DeptResponse.data);
          const CourseResponse = await axios.get("http://localhost:3000/admin/search/getAllCourseList", config);
          setCourseData(CourseResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);
  
  return (
    <>
     <div style={{ flexGrow: 1 }}><br/>
     <center>
     <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-pink-500">
      Welcome to your Admin Dashboard, {username}! 👋🙋
    </h1>

    <p className="text-lg">This panel provides a quick overview of the system statistics.</p>
    </center><br/>
    <div className="flex flex-wrap justify-center gap-4">
        {/* Admin Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Admin</span>
            </div>
            <div className="text-center text-2xl text-blue-500 mt-2">
                <span>{adminData.length}</span>
            </div>
        </div>

        {/* Student Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Student</span>
            </div>
            <div className="text-center text-2xl text-green-500 mt-2">
                <span>{studentData.length}</span>
            </div>
        </div>

        {/* Faculty Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Faculty</span>
            </div>
            <div className="text-center text-2xl text-red-500 mt-2">
                <span>{facultyData.length}</span>
            </div>
        </div>

        {/* Staff Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Staff</span>
            </div>
            <div className="text-center text-2xl text-purple-500 mt-2">
                <span>{staffData.length}</span>
            </div>
        </div>

        {/* Department Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Department</span>
            </div>
            <div className="text-center text-2xl text-yellow-500 mt-2">
                <span>{DeptData.length}</span>
            </div>
        </div>

        {/* Course Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg text-gray-800">
                <span>Course</span>
            </div>
            <div className="text-center text-2xl text-green-500 mt-2">
                <span>{CourseData.length}</span>
            </div>
        </div>
    </div>
</div>

<br/>
<div className="flex flex-wrap justify-center gap-4">
          {/* Navigation Buttons */}
          <a href="/admin/adminlist" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Admin List
          </a>
          <a href="/admin/facultylist" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Faculty List
          </a>
          <a href="/admin/studentlist" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Student List
          </a>
          <a href="/admin/stafflist" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Staff List
          </a>
          <a href="/admin/deptlist" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Department List
          </a>
          <a href="/admin/courselist" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Course List
          </a>
          <a href="/admin/AdminUserProfile" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Admin User Profile
          </a>
        </div>
        <br/>

    </>
  );
}
