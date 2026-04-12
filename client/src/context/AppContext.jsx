import { createContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from "react-toastify";



export const AppContext = createContext();
export const AppContextProvider = (props) => {
  // search state
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)

  const [userData, setUserData] = useState(null)
  const [userApplications, setUserApplications] = useState([])

  // Clerk auth

  const { isSignedIn, getToken } = useAuth();

  const { user } = useUser();


  // Funtion to fetch jobs (your existing logic)
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(apiUrl + '/api/jobs')
      if (data.success) {
        setJobs(data.jobs);
        

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

 

  //Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(apiUrl + '/api/company/company', { headers: { token: companyToken } })
      if (data.success) {
        setCompanyData(data.company)
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {

    fetchJobs();
      if (companyToken) {
      fetchCompanyData()
      }
    const storedCompanyToken = localStorage.getItem('companyToken')

  
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken)
    }
  }, [companyToken]);
  //  useEffect(() => {

  //   fetchJobs();

  //   if (companyToken) {
  //     fetchCompanyData()
  //   }
  // }, [companyToken]);


  // USER SYNC (runs once after login)
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
        await fetchUserData()
      } catch (error) {
        console.error("User sync failed:", error);
      }
    };

    syncUser();
  }, [isSignedIn]);


  //Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const {data} = await axios.get(apiUrl+ '/api/user/user' ,
        {headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          setUserData(data.user)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
    setUserData()
    
  }


  useEffect(() => {
     if(user){
      fetchUserData() 
    
     }

  }
  , [user])

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    apiUrl,
    userData,
    setUserData,
    fetchUserData,

  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
