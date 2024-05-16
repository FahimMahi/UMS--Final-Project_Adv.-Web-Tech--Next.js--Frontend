"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface ITStuffData {
  id: string;
  // Add any other properties you need from the ITStuff data
}

interface StudentData {
  id: string;
  // Add any other properties you need from the student data
}

export default function ITStuffDashboard() {
  const [ITStuffData, setITStuffData] = useState<ITStuffData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      
      // if (!email || !token) {
      //   // Redirect to ITStuff Login Page
      //   window.location.href = '/it-stuff/login';
      //   return; // Important to return to avoid executing the rest of the hook
      // }
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const fetchData = async () => {
        try {
          // Fetch ITStuff data
          const ITStuffResponse = await axios.get("http://localhost:3000/it-stuff", config);
          setITStuffData(ITStuffResponse.data);

          // Fetch student data related to the ITStuff
          const studentResponse = await axios.get(`http://localhost:3000/it-stuff/getAllStudent`, config);
          setStudentData(studentResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <br />
      <center>
        <h1 className="text-2xl font-bold mb-6 text-black">
          Welcome to your ITStuff Dashboard! 👋🙋
        </h1>
        <p className="text-lg text-black">This panel provides a quick overview of the system statistics.</p>
      </center>
      <br />
      <div className="flex flex-wrap justify-center gap-4">
        {/* ITStuff Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm border border-black">
          <div className="font-semibold text-lg text-black">
            <span>ITStuff</span>
          </div>
          <div className="text-center text-2xl text-black mt-2">
            <span>{ITStuffData.length}</span>
          </div>
        </div>

        {/* Student Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm border border-black">
          <div className="font-semibold text-lg text-black">
            <span>Student</span>
          </div>
          <div className="text-center text-2xl text-black mt-2">
            <span>{studentData.length}</span>
          </div>
        </div>
        {/* Add more cards for other data if needed */}
      </div>
      <br />
      {/* Add navigation buttons or links here */}
    </div>
  );
}
