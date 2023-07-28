const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pic: {
        type: String
    },
    bio: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("Users", userSchema);
module.exports = User;