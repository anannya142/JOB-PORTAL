import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";


const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div 
    // className="shadow py-4 border-b border-blue-300 bg-white dark:bg-slate-950 dark:border-slate-800"
    className="shadow py-4 bg-gray dark:bg-slate-900 border-b border-blue-400 dark:border-slate-800 shadow-sm">
    
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="logo"
        />

        {/* Right Side */}
        <div className="flex items-center gap-4 ">
          {user ? (
            <>
              <Link to="/applications"
              className="text-gray-800 dark:text-white  font-medium">Applied Jobs</Link>
              <p className="hidden sm:block text-gray-700 dark:text-white">
                Hi, {user.firstName} {user.lastName}
              </p>
              <UserButton />
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-600 dark:text-white"
              >
                Recruiter Login
              </button>

              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 dark:text-white hover:bg-blue-700 text-white px-6 py-2 rounded-full"
              >
                Login
              </button>
            </>
          )}

          {/* Theme Toggle ALWAYS LAST */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};


export default Navbar;
