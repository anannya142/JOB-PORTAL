import express from "express"
import { registerCompany ,loginCompany, postJob, getCompanyData, getCompanyPostedJobs, getCompanyJobApplicants, changeJobApplicationsStatus, changeJobVisibility,updateJob,deleteJob} from "../controllers/companyController.js"
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router()


//Register a company
router.post ('/register',upload.single('image'), registerCompany);
//company login
router.post('/login', loginCompany);
// get company data
router.get('/company', protectCompany, getCompanyData);

//post a job
router.post('/post-job',protectCompany,postJob)

//Get Applicants Data of Company 
router.get('/applicants',protectCompany, getCompanyJobApplicants);
//Get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs);
//  Change application status
router.post('/change-status',protectCompany,changeJobApplicationsStatus);

//Change applications visibility
router.post('/change-visibility',protectCompany,changeJobVisibility);

router.put('/update-job/:id', protectCompany, updateJob);
router.delete('/delete-job/:id', protectCompany, deleteJob);
export default router;
