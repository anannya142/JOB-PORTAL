import 'dotenv/config'
import './config/instrument.js'

console.log("Environment check:");
console.log("CLERK_WEBHOOK_SECRET exists:", !!process.env.CLERK_WEBHOOK_SECRET);
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
import express from 'express'
import  cors from 'cors'

import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'

//Initialize Express
const app = express()
//connect to database
await connectDB()


//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req,res)=> res.json("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// ✅ Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        vercel: true
    });
});

app.post('/webhooks',clerkWebhooks);
// ✅ Test webhook endpoint (for manual testing)
app.get('/test-webhook', (req, res) => {
    console.log('Test webhook endpoint hit');
    res.json({
        message: 'Webhook endpoint is accessible',
        webhook_url: 'https://' + req.headers.host + '/webhooks',
        method: 'POST',
        required_headers: ['svix-id', 'svix-timestamp', 'svix-signature']
    });
});

//Port
const PORT = process.env.PORT || 5001
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

export default app;