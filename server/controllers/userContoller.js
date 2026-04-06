
import User from "../models/User"

//get user data
export const getUserData = async(req,res) =>{
    const userId = req.auth.userId
try {
    const user = await User.findById(userId)
    if(!user){
        return res.json({success: false , message: 'User not found' })
    }
} catch (error) {
    res.json({success:false, message:error.message})
    
}

}

//Apply for a job
export const applyForJob = async(req,res)=>{

}

//get user applied applications
export const getUserJobApplications = async(req,res) =>{

}
//update user profile(resume)
export const updateUserResume = async(req,res) =>{
    
}