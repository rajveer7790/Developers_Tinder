const validator = require("validator"); // Importing validator for input validation
const validateSignupData = (req) => {
    const{firstName, lastName, email, password} = req.body;
    if(!(firstName || lastName)){
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }
    else if(!validator.isStrongPassword(password, { minLength: 8 })){
        throw new Error("Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols");
    }
};

module.exports = {
    validateSignupData,
};