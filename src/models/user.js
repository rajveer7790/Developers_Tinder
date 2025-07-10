const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
   
});
const User = mongoose.model("User", userSchema);
module.exports = User;
// This code defines a Mongoose schema and model for a user in a MongoDB database.
