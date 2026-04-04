
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4 bg-gray-200 dark:bg-slate-900 border-b border-blue-400 dark:border-slate-800">
      
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        
        {/* ✅ LOGO (FIXED) */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={assets.logo} className="block dark:hidden h-8" />
          <img src={assets.logo_dark} className="hidden dark:block h-8" />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to="/applications"
                className="text-gray-800 dark:text-white font-medium"
              >
                Applied Jobs
              </Link>

              <p className="hidden sm:block text-gray-700 dark:text-gray-200">
                Hi, {user.firstName} {user.lastName}
              </p>

              <UserButton />
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-600 dark:text-gray-300"
              >
                Recruiter Login
              </button>

              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
              >
                Login
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;