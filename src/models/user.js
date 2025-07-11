const mongoose = require("mongoose"); // Importing mongoose for MongoDB object modeling
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3, // Minimum length for first name
        maxlength: 50 // Maximum length for first name
    },
    lastName: {
        type: String,
        //required: true
    },
    email: {
        lowercase: true, // Ensures email is stored in lowercase
        type: String,
        required: true,
        unique: true,
        trim: true // Removes whitespace from both ends of the string
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    about: {
        type: String,
        default: "This is a user",
    },
    skills: {
        type: [String],
        
    },
    age: {
        type: Number,
        min: 18, // Minimum age
        max: 120
     }
},
{
    timestamps: true ,// Automatically adds createdAt and updatedAt fields
});
const User = mongoose.model("User", userSchema); // User model
module.exports = User;
// This code defines a Mongoose schema and model for a user in a MongoDB database.
