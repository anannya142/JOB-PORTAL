import Company from "../models/Company.js";
// import User from '../models/User.js';

import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js"
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
//Register a new company
export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })

    }

    try {
        const companyExists = await Company.findOne({ email })
        if (companyExists) {
            return res.json({ success: false, message: 'company already registered ' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })
        res.json({
            sucess: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)

        })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

};
// Update an existing job
export const updateJob = async (req, res) => {
    const { id } = req.params; // job id from URL
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id
    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.json({ success: false, message: "Job not found" });
        }

        //  Important: Only allow the company who created it
        if (job.companyId.toString() !== companyId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Update fields
        job.title = title || job.title;
        job.description = description || job.description;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.level = level || job.level;
        job.category = category || job.category;

        await job.save();

        res.json({ success: true, job });

    } catch (error) {
        console.log("UPDATE JOB ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
//delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//Company login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body
    try {
        const company = await Company.findOne({ email })

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)

            })

        }
        else {
            res.json({ success: false, message: 'Invalid email or password' })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

//Get company data
export const getCompanyData = async (req, res) => {


    try {
        const company = req.company
        res.json({ success: true, company })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}
//Post a new job
export const postJob = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body
    const companyId = req.company._id
    console.log(companyId, { title, description, location, salary });
    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newJob.save()

        res.json({ success: true, newJob })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//Get Company Job applicants

export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id;

        const applications = await JobApplication.find({ companyId })
            .populate("userId", "name image resume")
            .populate("jobId", "title location category level salary")
            .exec();

        return res.json({
            success: true,
            applications
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

//get jobs data posted by company
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id
        const jobs = await Job.find({ companyId })
        //Adding No. of applicatns info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, jobsData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}
//Change job applications Status
export const changeJobApplicationsStatus = async (req, res) => {
    try {
        const { id, status } = req.body

        //Find JobApplication and update the status
        await JobApplication.findOneAndUpdate({ _id: id }, { status })

        res.json({ success: true, message: 'Status Changed' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//change job visibility
export const changeJobVisibility = async (req, res) => {
    try {
        const { id } = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)
        // check if job exists
        if (!job) {
            return res.json({ success: false, message: "Job not found" })
        }

        // check ownership
        if (companyId.toString() !== job.companyId.toString()) {
            return res.json({ success: false, message: "Not authorized to modify this job" })
        }

        job.visible = !job.visible




        await job.save()

        res.json({ success: true, job })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}