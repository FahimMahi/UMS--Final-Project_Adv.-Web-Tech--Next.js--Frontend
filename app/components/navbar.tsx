"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import Logout from "./logout";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setIsLoggedIn(!!storedEmail);
  }, []);
  return (
    <>
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.navbarBrand}>
          UMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={styles.navbartogglericon}></span>
        </button>

        <div className={styles.collapse}>
          <ul className={styles.navbarNav}>
            <li className={styles.navitem}>
              <Link href="/">Home</Link>
            </li>

            {isLoggedIn && (
              <>
                <li className={styles.navitem}>
                  <Link href="/admin/admindashboard">Dashboard</Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/admin/adminlist">Admin List</Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/admin/facultylist">Faculty List</Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/admin/studentlist">Student List</Link>
                </li>
                {/* <li className={styles.navitem}>
                  <Link href="/admin/stafflist">Staff List</Link>
                </li> */}
                {/* <li className={styles.navitem}>
                  <Link href="/admin/deptlist">Dept. List</Link>
                </li> */}
                <li className={styles.navitem}>
                  <Link href="/admin/courselist">Course List</Link>
                </li>
                <li className={styles.navitem}>
                  <Link href="/admin/AdminUserProfile">My Profile</Link>
                </li>
              </>
            )}
            <li className={styles.navitem}>
              <Link href="/admin/aboutus">About Us</Link>
            </li>
            <li className={styles.navitem}>
              {isLoggedIn ? <Logout /> : <Link href="/admin/adminlogin">Login</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}