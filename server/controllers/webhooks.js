// // // This function listens to Clerk Webhook events (user.created, user.updated, user.deleted) 
// // // and syncs the Clerk user with your MongoDB database.
// import 'dotenv/config'
// import { Webhook } from "svix";
// // import mongoose from "mongoose"; 
// import User from "../models/User.js";


// //API Controller Function to manage clerk User with database

// export const clerkWebhooks = async (req, res) => {
//     try {

//               // Add this logging first
//         console.log("=== Webhook Debug Info ===");
//         console.log("Webhook secret exists:", !!process.env.CLERK_WEBHOOK_SECRET);
//         console.log("Request method:", req.method);
//         console.log("Request headers:", req.headers);
//         console.log("Request body type:", typeof req.body);
//         console.log("Request body:", req.body);
        
//         // If secret doesn't exist, fail early
//         if (!process.env.CLERK_WEBHOOK_SECRET) {
//             console.error("ERROR: CLERK_WEBHOOK_SECRET is not set!");
//             return res.status(500).json({ 
//                 success: false, 
//                 error: "Webhook secret not configured" 
//             });
//         }

//         //Create a Svix instance with clerk webhook secret that knows how to verify signatures..
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//         // IMPORTANT: For Vercel, req.body is already parsed as JSON
//         // So we need to use the stringified version
//         //Verifying Headers
//         await whook.verify(JSON.stringify(req.body),
//             {
//                 "svix-id": req.headers["svix-id"],
//                 "svix-timestamp": req.headers["svix-timestamp"],
//                 "svix-signature": req.headers["svix-signature"]
//             })

//         //getting data from request body
//         // {
//         //     "type": "user.created",
//         //         "data": { ... }
//         // }
// //         const payload = req.body.toString("utf8");
// // await whook.verify(payload, {
// //     "svix-id": req.headers["svix-id"],
// //     "svix-timestamp": req.headers["svix-timestamp"],
// //     "svix-signature": req.headers["svix-signature"]
// // });


//         const { data, type } = req.body

//         //Switch case for different evants
//         // When a Clerk user is created → you save it in MongoDB.

//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     // name: data.first_name + "" + data.last_name,
//                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),

//                     image: data.image_url,
//                     resume: ''

//                 };

//                 await User.create(userData);
//                 res.json({success: false });
//                 console.log("Webhook event:", type);

//                 break; 

//             }

//             case 'user.updated': {
//                 const userData = {

//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + "" + data.last_name,
//                     image: data.image_url,


//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;

//             }

//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }

//             default:
//                 break;
//         }



//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, })

//     }

// }

import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        // 1. Raw body
        const payload = req.body.toString("utf8");
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // 2. Verify signature
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await wh.verify(payload, headers);

        // 3. Parse the incoming event
        const { type, data } = JSON.parse(payload);

        console.log("Webhook event →", type);

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    image: data.image_url,
                    resume: ""
                };

                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, {
                    email: data.email_addresses[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    image: data.image_url
                });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Webhook Error →", error.message);
        res.status(400).json({ success: false });
    }
};
