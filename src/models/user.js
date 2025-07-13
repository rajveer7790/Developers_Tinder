const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  about: {
    type: String,
    default: "This is a user",
    trim: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  age: {
    type: Number,
    min: [18, "Minimum age is 18"],
    max: [120, "Maximum age is 120"],
  },
},
{
  timestamps: true,
});

const User = mongoose.model("User", userSchema); // User model
module.exports = User;
// This code defines a Mongoose schema and model for a user in a MongoDB database.
