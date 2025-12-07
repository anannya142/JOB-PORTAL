import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: {type:String , required:true},
    name : {type:String , required:true},
    email:{type:String} ,
    resume:{type:String , default: "" },
    image:{type:String , required:true},
})
const User = mongoose.model('User', userSchema);
export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     _id: { 
//         type: String, 
//         required: true 
//     }, // This will be Clerk's user ID (e.g., "user_123")
//     name: { 
//         type: String, 
//         required: true 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     resume: { 
//         type: String, 
//         default: "" 
//     },
//     image: { 
//         type: String, 
//         // required: true 
//     },
//     // Add these optional fields for better data handling
//     firstName: { 
//         type: String, 
//         default: "" 
//     },
//     lastName: { 
//         type: String, 
//         default: "" 
//     },
//     // Add timestamps for tracking
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     // Disable the version key (__v)
//     versionKey: false
// });

// // Update the updatedAt timestamp on save
// userSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);
// export default User;