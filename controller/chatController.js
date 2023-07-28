const Chat = require("../model/chatModel");
const User = require('../model/userModel');
const Convo = require('../model/convoModel');
const { chatDate, lastChat } = require('../utils/checkDate');

const getConvo = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId){
            const paramId = req.body.paramId;
            const rawChatUsers = await Convo.find({
                $or:[ 
                    {sender: userId},
                    {recipient: userId}
                ]
            }).sort({lastDate: -1});
            const chatUsers = [];
            for(let data of rawChatUsers){
                const user = (data.sender==userId) ? data.recipient : data.sender;
                const userDetails = await User.findOne({_id: user});
                const obj = {
                    user_id: user,
                    username: userDetails.username,
                    fname: userDetails.fname,
                    pic: userDetails.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    convo: data._id,
                    lastMessage: data.lastMessage,
                    lastDate: lastChat(data.lastDate),
                    lastSender: data.lastSender,
                    isRead: data.isRead
                }
                chatUsers.push(obj);
            }

            let profileChat = {};
            if(paramId!=null){
                const user = await User.findOne({_id: paramId});
                profileChat = {
                    user_id: user._id,
                    username: user.username,
                    fname: user.fname,
                    pic: user.pic,
                }
            }
            res.send({
                status: "success",
                message: "Got all users you chat with",
                chatUsers,
                profileChat
            });
        } else {
            res.send({status: "error", message: "Invalid token"});
        }
    } catch (error) {
        console.log(error);
    }
}

const getMessage = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId){
            const convo = req.body.convo
            if(convo==""){
                return res.send({
                    status: "success",
                    message: "No message",
                    allMessages: []
                });
            }
            const rawMessages = await Chat.find({convo: convo});
            const allMessages = [];
            for(let message of rawMessages){
                const obj = {
                    sender: message.sender,
                    recipient: message.recipient,
                    convo: message.convo,
                    message: message.message,
                    date: chatDate(message.createdAt)
                }
                allMessages.push(obj);
            }
            res.send({
                status: "success",
                message: "Got all your messages",
                allMessages
            });
        } else {
            res.send({status: "error", message: "Invalid token"});
        }
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId){
            const recipientId = req.body.recipient;
            let convoId = req.body.convo;
            if(convoId==""){
                const newConvo = new Convo({
                    sender: userId,
                    recipient: recipientId,
                    lastMessage: "",
                    lastDate: "",
                    lastSender: "",
                    isRead: false
                });
                convoId = newConvo._id
                await newConvo.save();
            }
            
            const newChat = new Chat({
                sender: userId,
                recipient: req.body.recipient,
                convo: convoId,
                message: req.body.message
            });
            await newChat.save();

            const updateConvo = await Convo.findByIdAndUpdate(convoId, {
                lastMessage: newChat.message,
                lastDate: newChat.createdAt,
                lastSender: userId,
                isRead: false
            });

            const logUser = await User.findOne({_id: userId});
            res.send({
                status: "success",
                message: "Your message has sent successfully!",
                newChat : {
                    sender: newChat.sender,
                    fname: logUser.fname,
                    pic: logUser.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    recipient: newChat.recipient,
                    message: newChat.message,
                    convo: newChat.convo,
                    date: chatDate(newChat.createdAt)
                }
            });
        } else {
            res.send({status: "error", message: "Invalid token"});
        }
    } catch (error) {
        console.log(error);
    }
}

const setRead = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId){
            const convoId = req.body.convo;
            const updateConvo = await Convo.findByIdAndUpdate(convoId, {
                isRead: true
            });
            res.send({
                status: "success",
                message: "You read the chat successfully"
            });
        } else {
            res.send({status: "error", message: "Invalid token"});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConvo,
    getMessage,
    sendMessage,
    setRead
}