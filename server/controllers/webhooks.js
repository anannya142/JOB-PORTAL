
// import { Clerk } from "@clerk/clerk-sdk-node";
// import User from "../models/User.js";

// const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const signature = req.headers['clerk-signature'];
//     const payload = req.body; // raw body required!

//     // Verify webhook
//     const event = clerk.webhooks.verify(payload, signature, process.env.CLERK_WEBHOOK_SECRET);
//     //Getting data from req.body
//     // const {data,type} = req.body
    
    
    
//     if (event.type === "user.created") {
//       const clerkId = event.data.id;
//       const exists = await User.findOne({ clerkId });
//       if (!exists) await User.create({ clerkId });
//     }

//     res.status(200).json({ received: true });
//   } catch (err) {
//     console.error("Webhook verification failed:", err);
//     res.status(400).json({ error: "Webhook verification failed" });
//   }
// };
import { Webhook } from 'svix'
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // ✅ correct svix headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    }

    // ✅ verify the webhook
    const event = wh.verify(req.body, headers)

    const { type, data } = event

    // if (type === "user.created") {
    //   const clerkId = data.id
    //   const exists = await User.findOne({ clerkId })
    //   if (!exists) {
    //     await User.create({ clerkId })
    //     console.log("User created:", clerkId)
    //   }
    // }

    // if (type === "user.deleted") {
    //   await User.findOneAndDelete({ clerkId: data.id })
    //   console.log("User deleted:", data.id)
    // }

    //Getting data from request body

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