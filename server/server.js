import './config/instrument.js'
import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import jobRoutes from './routes/jobRoutes.js'
import { clerkMiddleware} from '@clerk/express';

const app = express();

// --- Middleware ---
// app.use(cors());


app.use(cors({
  origin: [
    "http://localhost:5173",  // local dev
    "https://job-portal-steel-rho-38.vercel.app" // your deployed frontend
  ],
  credentials: true
}));





// --- Raw body parser only for webhooks ---
app.use('/webhooks', express.raw({ type: '*/*' }));
// --- JSON parser for normal API routes ---
app.use(express.json());
app.use(clerkMiddleware())




// --- Connect DB and Cloudinary ---
await connectDB();
await connectCloudinary();

// --- Routes ---
app.get('/', (req, res) => res.json("API Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// --- Webhook route ---
app.post('/webhooks', clerkWebhooks);

// --- API routes ---
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);


// --- Start server ---
const PORT = process.env.PORT || 5001;

// --- Sentry error handler ---
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

