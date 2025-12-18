import React from 'react';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom';

const JobCard = ({job}) => {

  const navigate = useNavigate();
  return (
    <div 
    className=' border p-6 shadow rounded-xl bg-gray border border-dark-300 dark:border-blue-300 dark:bg-gradient-to-r from-primary-foreground-200 to-primary'
    // className=' border p-6 shadow rounded-xl bg-blue-40 border border-blue-300 dark:border-blue-700 dark:bg-gradient-to-l from-purple-700 to-purple-800 to-primary'
    >
        <div className='flex justify-between items-center'>
            <img  className='h-8'src={assets.company_icon} alt=''/>
        </div>
        <h4 className='font-medium  dark:text-primary text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs'>
            <span className='bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 px-4 py-1.5 rounded dark:text-gray-200' >{job.location}</span>
            <span className='bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 px-4 py-1.5 rounded dark:text-gray-200' >{job.level}</span>
        </div>
        <p className='text-gray-800 dark:text-gray-200 text-sm mt-4'dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className='mt-4 flex gap-4 text-sm'>
            <button  onClick = {()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-primary text-white px-4 py-2 rounded'>Apply now</button>
            {/* <button className=' border-black-800 text-gray-500  px-4 py-2 rounded'>Learn more</button> */}
            <button className='border border-gray-600 bg-gray dark:text-white text-gray px-4 py-2 rounded'>Apply now</button>
        </div>
    </div>
  )
}
  // onClick = {()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}
  // onClick = {()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} 
export default JobCard;