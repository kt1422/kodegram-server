const User = require('../model/userModel');

const checkEmailExisting = async (inputEmail) => {
    const email = await User.findOne({email: inputEmail}); 
    if(email) {
        error = `${inputEmail} is already exist!`;
        return error;
    }
}

const checkUsernameExisting = async (inputUsername) => {
    const isExisting = await User.findOne({username: inputUsername}); 
    if(isExisting) {
        error = `${inputUsername} is already exist!`;
        const user = {
            error: error,
            user_id: isExisting._id,
            username: isExisting.username
        }
        return user;
    }
}

module.exports = {
    checkEmailExisting,
    checkUsernameExisting
}