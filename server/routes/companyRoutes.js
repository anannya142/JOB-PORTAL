import express from "express"
import { registerCompany ,loginCompany, postJob, getCompanyData, getCompanyPostedJobs, getCompanyJobApplicants, changeJobApplicationsStatus, changeJobVisibility} from "../controllers/companyController.js"
import upload from "../config/multer.js";
const router = express.Router()


//Register a company
router.post ('/register',upload.single('image'), registerCompany);
//company login
router.post('/login', loginCompany);
// get company data
router.get('/company', getCompanyData);

//post a job
router.post('/post-job',postJob)

//Get Applicants Data of Company 
router.get('/applications', getCompanyJobApplicants);
//Get company job list
router.get('/list-jobs',getCompanyPostedJobs);
//  Change application status
router.post('/change-status',changeJobApplicationsStatus);

//Change applications visibility
router.post('/change-visibility',changeJobVisibility);


export default router;
