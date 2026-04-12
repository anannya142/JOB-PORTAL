
import { Webhook } from 'svix'
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // correct svix headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    }

    //  verify the webhook
    const event = wh.verify(req.body, headers)

    const { type, data } = event



    switch(type){
      case 'user.created' : {
        const userData ={
          _id:data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image:data.image_url,
          resume: ''
        }
        await User.create(userData)
        // res.json({})
        break;
      }
      case 'user.updated' : {
         const userData ={
        
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image:data.image_url,
          resume: ''
        }
         await User.findByIdUpdate(data.id,userData )
      }
      case 'user.deleted' : {
        await User.findByIdAndDelete(data.id)
        
        break;
      }
    }

    res.status(200).json({ received: true })

  } catch (err) {
    console.error("Webhook verification failed:", err)
    res.status(400).json({ error: "Webhook verification failed" })
  }
}