import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { bars } from "react-icons-kit/fa/bars"; // Import the menu icon

import Sidebar from "../screens/sidebar";

function Navbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-cyan-300 dark:bg-gray-900 p-4">
      <div className="flex items-center space-x-3">
        <Icon icon={bars} size={24} onClick={handleMenuClick} className="cursor-pointer" />
        <a href="#" className="hidden md:flex items-center">
          <span className="text-2xl font-semibold">Performance Management system</span>
        </a>
      </div>

        <a href="#" className="hidden md:flex items-center">
          <img src="profile.webp" className="h-8 rounded-full" alt="Profile" />
        </a>
      </nav>

      {isSidebarOpen && (
        <div >
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Navbar;
