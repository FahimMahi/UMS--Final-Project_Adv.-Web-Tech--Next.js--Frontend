import React from "react";

const Logout = () => {

  const handleLogout = () => {
    // Clear the stored email and token from local storage
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    // Redirect to the login page and reload the page
    window.location.href = "/admin/adminlogin";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
