import { createContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // search state
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // 🔐 Clerk auth
  const { isSignedIn, getToken } = useAuth();
   console.log("isSignedIn:", isSignedIn);

  // fetch jobs (your existing logic)
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ USER SYNC (runs once after login)
  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;
     


      try {
        const token = await getToken();

        await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/sync`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("User sync failed:", error);
      }
    };

    syncUser();
  }, [isSignedIn]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
