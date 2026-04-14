import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useUser , useAuth} from '@clerk/clerk-react'
import { toast } from "react-toastify";
import axios from "axios";
const Application = () => {
  //you will get the user detail from useUser hook
  const {user} = useUser()
  const {getToken} = useAuth()
  
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null)
  const {apiUrl, userData,userApplications,fetchUserData} = useContext(AppContext)

  

  const updateResume = async()=>{

    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()
      const {data} = await axios.post(apiUrl + '/api/user/update-resume', formData,
        {headers : {Authorization : `Bearer ${token}`}}
        
      )
      
      if(data.success){
        toast.success(data.message)
        await fetchUserData()
        console.log("data fetched")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
    setIsEdit(false)
    setResume(null)

  }
  return (
    <>
      <Navbar />
      {/* (65% of viewport height). */}
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 text-foreground '>
        <h2>Your Resume</h2>
        <div className='flex gap-2 items-center  mb-6 mt-3 flex-wrap'>
          {
            isEdit || userData && userData.resume === ""
              ? <>
                <label htmlFor="resumeUpload" className=" flex items-center cursor-pointer">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded mr-2 '>{resume ? resume.name :  "Select Resume"}</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button onClick={updateResume} className=' border border-green-400 dark:text-primary rounded-lg px-4 py-2 '>Save</button>
              </>
              : <div  className='flex items-center gap-2 flex-wrap'>
                <a className='bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-2 roundeded' href=''>
                  Resume
                </a>
              
                <button onClick={() => setIsEdit(true)} className='text-gray-500 dark:text-gray-300 border border-gray-300 dark:border-gray-600  rounded-lg px-4 py-2'>
                  Edit
                </button>
              </div>

          }
        </div>
        <h2 className='text-xl font-semibold mb-4'>JOB Applied</h2>
        <div className='overflow-x-auto w-full'>
        <table className='min-w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg'>
          {/* <table className='min-w-full bg-white border border-gray-200 rounded-lg'> */}
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left text-foreground'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody >
            {jobsApplied.map((job,index) => true ? (
             
              <tr key={job._id || index} >
                <td className='py-3 px-4  items-center gap-2 border-b text-foreground  whitespace-nowrap ' >
                  <img className='w-8 h-8' src={job.logo} alt="" />
                  {job.company}
                </td>
                <td className='py-2 px-4 border-b text-foreground'>{job.title}</td>
                <td className='py-2 px-4 border-b   text-foreground max-sm:hidden' >{job.location}</td>
                <td className='py-2 px-4 border-b text-foreground max-sm:hidden' >{moment(job.date, "DD MMM, YYYY").format('ll')}</td>
                <td className='py-2 px-4 border-b text-foreground' >
                  <span className={`${job.status === 'Accepted' ? 'bg-green-300' : job.status === 'Rejected' ? 'bg-red-300' :'bg-blue-300' } px-4 py-1.5 rounded`}>
                  {job.status}
                </span>
                  
                </td>
              </tr>
              
            ) : (null))}
          </tbody>
        </table>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Application;