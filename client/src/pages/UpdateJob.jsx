import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateJob = () => {
  const { id } = useParams();
  
  const { jobs, apiUrl, companyToken } = useContext(AppContext);

  const [jobData, setJobData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    level: "",
    category: ""
  });

  //  Load job
  useEffect(() => {
    const job = jobs.find((j) => j._id === id);

    if (job) {
      setJobData(job);
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        level: job.level,
        category: job.category
      });
    }
  }, [id, jobs]);



  const updateCompanyJob = async () => {
  console.log("ID:", id);
  console.log("Full URL:", `${apiUrl}/api/company/update-job/${id}`);
  
  try {
    const { data } = await axios.put(
      `${apiUrl}/api/company/update-job/${id}`,  // ← arg 1: URL
      formData,                                   // ← arg 2: body
      { headers: { token: companyToken } }        // ← arg 3: config
    );

    if (data.success) {
      toast.success("Job updated successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyJob();
  };

  if (!jobData) return <Loading />;

  return (
    <>
     

      <div className="min-h-screen container py-10 px-4 mx-auto">

        {/* TITLE */}
         <div className='w-full'>
          <p className='mb-2 '>Job Title</p>
        <input
          className="text-2xl font-bold border p-2 w-full"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
         </div>
        {/* LOCATION */}
          <div className='w-full'>
          <p className='my-2'>Job Location</p>
        <input
          className="border p-2 w-full mt-3"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        </div>
          {/* LEVEL */}
         <div className='w-full'>
           <p className='my-2'>Job Level</p>
      
        <input
          className="border p-2 w-full mt-3"
          value={formData.level}
          onChange={(e) =>
            setFormData({ ...formData, level: e.target.value })
          }
        />
        </div>
        {/* CATEGORY */}
        <div>
          <p>Job Category</p>
           <input
          className="border p-2 w-full mt-3"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, level: e.target.value })
          }
        />
        </div>

        {/* SALARY */}
        <div className='w-full'>
          <p>Job Salary</p>
            <input
          className="border p-2 w-full mt-3"
          value={formData.salary}
          onChange={(e) =>
            setFormData({ ...formData, salary: e.target.value })
          }
        />
        </div>
      

        {/* DESCRIPTION */}
        <div>
        <p>Job Description</p>
        <textarea
          className="border p-2 w-full mt-3 h-40"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        </div>
        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="bg-purple-700 text-white px-6 py-2 mt-5 rounded"
        >
          Update Job
        </button>
      </div>

      <Footer />
    </>
  );
};

export default UpdateJob;