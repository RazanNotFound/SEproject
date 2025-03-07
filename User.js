const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false,
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['Standard User', 'Organizer', 'System Admin'], // Allowed roles
        default: 'Standard User'  
      },
    
    //timeofCreation: { 
    //  type: Date,
    //  immutable: true,
    //  default: () => Date.now(),
    //}
},{timestamps: true});

module.exports = mongoose.model("Users", userSchema)
