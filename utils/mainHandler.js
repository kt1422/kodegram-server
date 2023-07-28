const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
require("dotenv/config");

const sendVerificationEmail = (username,reg_email,vkey) => {
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email: process.env.SENDER_EMAIL,
        name: 'Kodegram',
    }
    
    const receiver = [
        {
            email: reg_email,
        },
    ]

    apiInstance.sendTransacEmail(
        {
            sender,
            to: receiver,
            subject: 'Welcome to Kodegram',
            htmlContent:`
            Hi <b>${username}</b>,
            <br/><br/>
            Click the link to verify your email:
            <br/>
            <a href="${process.env.SITE_URL}/user/verify?email=${reg_email}&code=${vkey}">Verify Email</a>
            <br/><br/>
            Or copy this and paste it into your browser's address bar:<br/>
            ${process.env.SITE_URL}/user/verify?email=${reg_email}&code=${vkey}
            <br><br>
            <b>See you there!</b><br>
            <i>-Kodegram Team</i>
            `
        }
    )
    .then(function(data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
    },function(error) {
        console.error(error);
    });
}

const sendTemporaryPassword =(username,reg_email,temp_pass)=>{
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email: process.env.SENDER_EMAIL,
        name: 'Kodegram',
    }
    
    const receiver = [
        {
            email: reg_email,
        },
    ]

    apiInstance.sendTransacEmail(
        {
            sender,
            to: receiver,
            subject: 'Your temporary Kodegram password',
            htmlContent:`
            Hi <b>${username}</b>,
            <br/><br/>
            This is your temporary password:
            <br/>
            <h3>${temp_pass}</h3>
            <br/>
            NOTE: Quickly change your password after you log-in<br/>
            <br/>
            <i>-Kodegram Team</i>
            `
        }
    )
    .then(function(data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
    },function(error) {
        console.error(error);
    });
}

module.exports = {sendVerificationEmail, sendTemporaryPassword}