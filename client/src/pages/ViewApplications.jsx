
import React, { useEffect, useState, useContext } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import axios from 'axios'
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
// import { useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
// const { jobId } = useParams();
const ViewApplications = () => {

  const { apiUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)
  //Function to fetch company Job Applications data
  const fetchCompanyJobApplications = async () => {
    try {
      // const {data} = await axios.get(apiUrl + 'api/company/applicants',
      //   {headers: {token : companyToken}}
      // )

      const { data } = await axios.get(apiUrl + '/api/company/applicants', {
        headers: { token: companyToken }


      })

      if (data.success) {
        console.log("applications from API:", data);
        setApplicants(data.applications.reverse())

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])
  // Function to update job application status

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(apiUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } })
      if (data.success) {
        console.log('this is done:', data)
        fetchCompanyJobApplications()
        console.log('this is done')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 


  return applicants ? applicants.length === 0 ? (
  <div className="flex items-center justify-center h-[70vh] ">
    <p className="text-xl sm:text-2xl">No Jobs Available </p>

  </div>) : (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={applicant._id || index} className="text-gray-700">

                {/* Index */}
                <td className="py-2 px-4 border-b text-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b text-center flex items-center">
                  <img className="w-10 h-10 rounded-full mr-3 max-sm:hidden " src={applicant.userId?.image} alt="" />
                  <span>{applicant.userId?.name}</span>
                </td>


                {/* JOB */}
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobId?.title}
                </td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobId?.location}
                </td>


                <td className="py-2 px-4 border-b">
                  <a href={applicant.userId?.resume} target='_blank'
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                {/* ACTIONS */}
                <td className="py-2 px-4 border-b relative">
                  {applicant.status=== "Pending"
                  ?<div className="relative inline-block text-left group">

                    <button className="text-gray-500 action-button">
                      ...
                    </button>

                    <div className="z-10 hidden absolute right-0 top-0 mt-2 w-32 bg-white border rounded shadow group-hover:block">

                      <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
                        Accept
                      </button>

                      <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                        Reject
                      </button>

                    </div>
                  </div>
                  : <div>{applicant.status}</div>
                  }
       
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  ) : <Loading />
};

export default ViewApplications;
