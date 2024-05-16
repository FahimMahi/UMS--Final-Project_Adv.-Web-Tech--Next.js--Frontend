"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logout from "./logout";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setIsLoggedIn(!!storedEmail);
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          ITMS
        </Link>
        <button
          className="text-white block md:hidden"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="material-icons">menu</span>
        </button>
        <div className="hidden md:flex md:items-center md:justify-between w-full md:w-auto">
          <ul className="flex flex-col md:flex-row md:items-center">
            <li className="nav-item">
              <Link href="/" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">Home</Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link href="/itstuff/itstuff-dashboard" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link href="/itstuff/itstufflist" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">IT Stuff List</Link>
                </li>
                <li className="nav-item">
                  <Link href="/itstuff/studentlist" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">Student List</Link>
                </li>
                <li className="nav-item">
                  <Link href="/itstuff/itstuffprofile" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">ItStuff Profile</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              {isLoggedIn ? <Logout /> : <Link href="/itstuff/login" className="text-white py-2 px-4 hover:bg-gray-700 rounded-md">Login</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
