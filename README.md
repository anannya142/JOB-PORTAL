# JOB-PORTAL 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A production-ready full-stack job portal that bridges the gap between job seekers and employers. Job seekers can search, filter, and apply for positions while employers can manage their listings — secured with Clerk authentication, monitored with Sentry, and deployed live on Vercel.

## 🔗 Live Demo
👉 [https://job-portal-steel-rho-38.vercel.app](https://job-portal-steel-rho-38.vercel.app/#job-list)

## 📸 Screenshots

<!-- Add your screenshots here -->

> Coming soon

## ✨ Features

### 👤 Job Seeker
- Register and login securely via Clerk authentication
- Browse latest job listings on the home page
- Search and filter jobs by **category** and **location**
- Apply for jobs directly through the platform
- Upload and update resume via Cloudinary
- Track all applied jobs from personal dashboard

### 🏢 Employer
- Create, update, and delete job listings
- Manage all posted jobs from employer dashboard

### ⚙️ General
- Responsive design for all screen sizes
- Real-time error monitoring via Sentry
- Fast and reliable deployment on Vercel

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Clerk |
| File Storage | Cloudinary |
| Error Monitoring | Sentry |
| Deployment | Vercel |

##  Getting Started

### Prerequisites
Make sure you have these installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB account
- Clerk account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/anannya142/JOB-PORTAL.git
cd JOB-PORTAL
```

2. **Install dependencies for backend**
```bash
cd server
npm install
```

3. **Install dependencies for frontend**
```bash
cd client
npm install
```

4. **Set up environment variables**

Create a `.env` file in the server folder and add your variables (see Environment Variables section below)

5. **Run the backend**
```bash
cd server
npm run dev
```

6. **Run the frontend**
```bash
cd client
npm run dev
```

7. **Open in browser**
```
http://localhost:5173
```

## 🔐 Environment Variables

Create a `.env` file in your server directory and add the following:

```env
# JWT Setup
JWT_SECRET=your_jwt_secret_here

# MongoDB Setup
MONGODB_URI=your_mongodb_connection_string_here

# Cloudinary Setup
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key

# Clerk Setup
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

> ⚠️ Never commit your `.env` file to GitHub. Make sure it is listed in your `.gitignore`

## 🔮 Future Improvements

- [ ] Migrate codebase to **TypeScript** for better type safety
- [ ] Add **unit and integration tests** with Jest and React Testing Library
- [ ] Email notifications for job applications
- [ ] Chat system between employers and job seekers
- [ ] Save / bookmark jobs feature
- [ ] Admin panel for platform management
- [ ] Next.js migration for improved SEO and performance

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!JOB-PORTAL
===
