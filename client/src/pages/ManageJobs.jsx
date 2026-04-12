import {React ,useEffect,useState } from 'react'
// import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const ManageJobs = () => {
  const navigate = useNavigate()

  const [jobs,setJobs] = useState([])
  const {apiUrl, companyToken}= useContext(AppContext)

  //Function to fetch company job aplications data
  const fetchCompanyJobs = async()=>{
    try {
      const {data} = await axios.get(apiUrl + '/api/company/list-Jobs',
         {headers:{token:companyToken}})
         if(data.success){
          setJobs(data.jobsData.reverse())
          console.log(data.jobsData)
         }else{
          toast.error(data.message)
         }
   
    } catch (error) {
       toast.error(error.message)
    }


  }

 useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs()
    }
 },[companyToken])
  return (
    // So there’s p-4 16px of breathing space inside the div.5xl in Tailwind ≈ 64rem → 64 × 16 = 1024px
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='text-gray-700'>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left  max-sm:hidden'>Date</th> 
              <th className='py-2 px-4 border-b text-left  max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index)=>(
              <tr key={index}>
                <td  className='py-2 px-4 border-b'>{index+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                <input className='scale-125 ml-4' type='checkbox'/>
                 
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded '>Add new job</button>
      </div>
    </div>
  )
}

export default ManageJobs