import Job from  "../models/Job.js"
import User from "../models/User.js"
import JobApplication from "../models/JobApplication.js"
import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'


//get user data
export const getUserData = async(req,res) =>{
   
    // const userId = req.clerkUserId
    //  const clerkId  = req.auth.userId
    const clerkId = req.clerkUserId; 
    
       
   
try {
    
    const user = await User.findOne({clerkId})
    if(!user){
        return res.json({success: false , message: 'User not found' })
    }else{
         return res.json({success: true, user })
    }
} catch (error) {
    res.json({success:false, message:error.message})
    
}

}

//Apply for a job
export const applyForJob = async(req,res)=>{
   const {jobId} = req.body
   const  clerkId = req.clerkUserId
   try {
    const isAlreadyApplied = await JobApplication.find({jobId, clerkId}) 
    if(isAlreadyApplied.length>0){
        return res.json({success:false, message:'Already applied'})
        

    }

    const jobData = await Job.findById(jobId)
    if(!jobData){
        return res.json({success:false, message:'Job not found'})
    }

    await JobApplication.create({
        companyId:jobData.companyId,
        clerkId,
        jobId,
        date:Date.now()
    })
    res.json({success:true, message:"applied successfully"})
   } catch (error) {
    res.json({success:false, message:error.message})
   }

}

//get user applied applications to display data on applied jobs
export const getUserJobApplications = async(req,res) =>{
    try {
        const clerkId = req.clerkUserId; 
        const applications = await JobApplication.find({clerkId})
        .populate('companyId', 'name, email, image')
        .populate('jobId', 'title description,location,category,level, salary')
        .exec()

        if(!applications){
            return res.json({success : false , message: 'No job applications found for thi user'})
        }
        return res.json({success:true, applications})

    } catch (error) {
          res.json({success:false, message:error.message})
    }

}

// export const updateUserResume = async (req, res) => {
//   try {
//     const clerkId = req.clerkUserId; 
//     const resumeFile = req.file

//     const userData = await User.findOne({ clerkId })
    
//     console.log(userData)
//     if (!userData) {
//       return res.json({
//         success: false,
//         message: "User not found"
//       })
//     }

//     if (!resumeFile) {
//       return res.json({
//         success: false,
//         message: "No file uploaded"
//       })
//     }

//     const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
//     userData.resume = resumeUpload.secure_url

//     await userData.save()

//     return res.json({
//       success: true,
//       message: "Resume Updated"
//     })

//   } catch (error) {
//     res.json({ success: false, message: error.message })
//   }
// }

export const updateUserResume = async (req, res) => {
  try {
    const clerkId = req.clerkUserId; 
    const resumeFile = req.file

    if (!resumeFile) {
      return res.json({
        success: false,
        message: "No file uploaded"
      })
    }

    const userData = await User.findOne({ clerkId })
    
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found"
      })
    }

    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: 'raw',        // ← required for PDFs
      format: 'pdf',               // ← preserve PDF format
      folder: 'resumes',           // ← optional: organise in cloudinary
    })

    // Delete old resume from cloudinary if it exists
    if (userData.resume) {
      const oldPublicId = userData.resume.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`resumes/${oldPublicId}`, { 
        resource_type: 'raw' 
      })
    }

    userData.resume = resumeUpload.secure_url
    await userData.save()

    // Clean up temp file after upload
    fs.unlinkSync(resumeFile.path)

    return res.json({
      success: true,
      message: "Resume Updated"
    })

  } catch (error) {
    // Clean up temp file if upload failed
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    res.json({ success: false, message: error.message })
  }
}