const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const convoSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastMessage: {
        type: String
    },
    lastDate: {
        type: Date
    },
    lastSender: {
        type: String
    },
    isRead: {
        type: Boolean
    }
}, {timestamps: true});

const Convo = mongoose.model("Convos", convoSchema);
module.exports = Convo;