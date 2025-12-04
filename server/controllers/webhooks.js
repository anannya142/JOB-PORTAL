// This function listens to Clerk Webhook events (user.created, user.updated, user.deleted) 
// and syncs the Clerk user with your MongoDB database.

import { Webhook } from "svix";
import User from "../models/User.js";


//API Controller Function to manage clerk User with database

export const clerkWebhooks = async (req, res) => {
    try {
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
                    name: data.first_name + "" + data.last_name,
                    image: data.image_url,
                    resume: ''

                }

                await User.create(userData)
                res.json({})

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