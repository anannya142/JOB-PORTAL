// // This function listens to Clerk Webhook events (user.created, user.updated, user.deleted) 
// // and syncs the Clerk user with your MongoDB database.
import 'dotenv/config'
import { Webhook } from "svix";
// import mongoose from "mongoose"; 
import User from "../models/User.js";


//API Controller Function to manage clerk User with database

export const clerkWebhooks = async (req, res) => {
    try {

              // Add this logging first
        console.log("=== Webhook Debug Info ===");
        console.log("Webhook secret exists:", !!process.env.CLERK_WEBHOOK_SECRET);
        console.log("Request method:", req.method);
        console.log("Request headers:", req.headers);
        console.log("Request body type:", typeof req.body);
        console.log("Request body:", req.body);
        
        // If secret doesn't exist, fail early
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error("ERROR: CLERK_WEBHOOK_SECRET is not set!");
            return res.status(500).json({ 
                success: false, 
                error: "Webhook secret not configured" 
            });
        }

        //Create a Svix instance with clerk webhook secret that knows how to verify signatures..
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Headers
        await whook.verify(JSON.stringify(req.body),
            {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            })

        //getting data from request body
        // {
        //     "type": "user.created",
        //         "data": { ... }
        // }


        const { data, type } = req.body

        //Switch case for different evants
        // When a Clerk user is created → you save it in MongoDB.

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    // name: data.first_name + "" + data.last_name,
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),

                    image: data.image_url,
                    resume: ''

                };

                await User.create(userData);
                res.json({success: false });
                console.log("Webhook event:", type);

                break; 

            }

            case 'user.updated': {
                const userData = {

                    email: data.email_addresses[0].email_address,
                    name: data.first_name + "" + data.last_name,
                    image: data.image_url,


                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;

            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, })

    }

}

// export const clerkWebhooks = async (req, res) => {
//   try {
//     // Ensure MongoDB connection
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGODB_URI);
//     }

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
//     // Verify webhook signature
//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"]
//     });

//     const { data, type } = req.body;
    
//     console.log(`📨 Webhook: ${type} for user: ${data.id}`);

//     switch (type) {
//       case 'user.created': {
//         // Prepare user data matching your schema
//         const userData = {
//           _id: data.id, // Clerk ID as _id
//           email: data.email_addresses[0]?.email_address || '',
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           firstName: data.first_name || '',
//           lastName: data.last_name || '',
//           image: data.image_url || '/default-avatar.png', // Provide default
//           resume: '',
//           createdAt: new Date(),
//           updatedAt: new Date()
//         };

//         // Check if user already exists (prevent duplicates)
//         const existingUser = await User.findById(data.id);
//         if (existingUser) {
//           console.log(`⚠️ User already exists: ${data.id}`);
//           return res.status(200).json({ success: true });
//         }

//         // Create user
//         await User.create(userData);
//         console.log(`✅ User created: ${data.id}`);
//         return res.status(201).json({ success: true });
//       }

//       case 'user.updated': {
//         const updatedData = {
//           email: data.email_addresses[0]?.email_address || '',
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           firstName: data.first_name || '',
//           lastName: data.last_name || '',
//           image: data.image_url || '/default-avatar.png',
//           updatedAt: new Date()
//         };

//         // Use findByIdAndUpdate since _id = data.id
//         const updatedUser = await User.findByIdAndUpdate(
//           data.id, // Find by _id (Clerk ID)
//           updatedData,
//           { 
//             new: true, 
//             upsert: true, // Create if doesn't exist
//             runValidators: true 
//           }
//         );

//         console.log(`✅ User updated: ${data.id}`);
//         return res.status(200).json({ success: true, user: updatedUser });
//       }

//       case 'user.deleted': {
//         // Use findByIdAndDelete since _id = data.id
//         const deletedUser = await User.findByIdAndDelete(data.id);
        
//         if (!deletedUser) {
//           console.log(`⚠️ User not found: ${data.id}`);
//           return res.status(404).json({ success: false, message: "User not found" });
//         }

//         console.log(`✅ User deleted: ${data.id}`);
//         return res.status(200).json({ success: true });
//       }

//       default:
//         console.log(`ℹ️ Unhandled event: ${type}`);
//         return res.status(200).json({ success: true });
//     }

//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     console.error("Error details:", error);
    
//     // More specific error responses
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ 
//         success: false, 
//         error: "Validation Error",
//         details: error.errors 
//       });
//     }
    
//     if (error.code === 11000) { // Duplicate key error
//       return res.status(409).json({ 
//         success: false, 
//         error: "User already exists" 
//       });
//     }

//     return res.status(500).json({ 
//       success: false, 
//       error: "Internal server error" 
//     });
//   }
// };