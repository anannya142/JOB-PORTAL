
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// --- Middleware ---
app.use(cors());

// --- Raw body parser only for webhooks ---
app.use('/webhooks', express.raw({ type: '*/*' }));

// --- JSON parser for normal API routes ---
app.use(express.json());

// --- Connect DB and Cloudinary ---
await connectDB();
await connectCloudinary();

// --- Routes ---
app.get('/', (req, res) => res.json("API Working"));

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

// --- Sentry error handler ---
Sentry.setupExpressErrorHandler(app);

// --- Start server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
