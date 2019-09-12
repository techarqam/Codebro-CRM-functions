
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const nodemailer = require('nodemailer');
// const cors = require('cors')({ origin: true });
admin.initializeApp();





// export const createUsers = functions.firestore.document('Users/{user}').onCreate(async snapshot => {

//     console.log("Started");
//     const user: any = snapshot.data();
//     // const password = await createPassword();
//     // console.log(password);
//     const docId = snapshot.id;

//     if (!user.password) {



//         admin.auth().createUser({
//             email: user.email,
//             password: user.password,
//             displayName: user.name,
//         }).then(function (userRecord) {
//             console.log("uid", userRecord.uid);
//             // user.password = password;
//             console.log("user1", user);
//             admin.firestore().doc(`/Users/${docId}`).delete().then(() => {
//                 admin.firestore().doc(`/Users/${userRecord.uid}`).set(user).then(() => {

//                     console.log("User Created")

//                 }).catch(function (error) { console.log("error", error) })
//             }).catch(function (error) { console.log("error", error) })
//         }).catch(function (er) {
//             console.log(er);
//             admin.firestore().doc(`/Users/${docId}`).delete().catch(function (err) { console.log("error", err) })
//         })


//     }
// })


// async function createPassword() {
//     let length = 8;
//     let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let retVal: string = "";
//     for (var i = 0, n = charset.length; i < length; ++i) {
//         retVal += charset.charAt(Math.floor(Math.random() * n));
//     }
//     return retVal;

// }

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codebro.info@gmail.com',
        pass: 'Super@123'
    }
});

exports.sendMailNew = functions.firestore.document('Users/{user}').onCreate(async snapshot => {
    // cors(req, res, () => {

    // getting dest email by query string
    // const dest = req.query.dest;
    // const pass = req.query.pass;
    const user: any = snapshot.data();

    const mailOptions = {
        from: 'Codebro<techarqam@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: user.email,
        subject: 'Welcome to Codebro CRM',
        html: `<h1>Your Password is ${user.password}</h1>
                <img src="https://firebasestorage.googleapis.com/v0/b/codebro-crm-433be.appspot.com/o/Logo%2Ficon.png?alt=media&token=daefd36b-7f10-4c9f-8563-8ca752a01f34" />
            `
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro: string, info: string) => {
        if (erro) {
            console.log(erro.toString());
        }
        console.log('Email Sent');
    });
});
// });





// export const subscribeToAdminNotifocations = functions.https.onCall(
//     async (data, context) => {
//         await admin.messaging().subscribeToTopic(data.token, data.topic);
//         return `subscribed to ${data.topic}`;
//     }
// );


// export const unsubscribeFromTopic = functions.https.onCall(
//     async (data, context) => {
//         await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
//         return `unsubscribed from ${data.topic}`;
//     }
// );






// export const sendAdminNotification = functions.firestore.document('AdminNotifications/{notification}').onCreate(async snapshot => {
//     const notification: admin.messaging.Notification = {};
//     const discount = snapshot.data();
//     notification.title = discount!.head;
//     notification.body = discount!.body;
//     console.log("discount", discount);
//     const payload: admin.messaging.Message = {
//         notification,
//         webpush: {
//             notification: {
//                 vibrate: [200, 100, 200],
//                 icon: 'https://firebasestorage.googleapis.com/v0/b/codebro-crm-433be.appspot.com/o/Logo%2Ficon.png?alt=media&token=daefd36b-7f10-4c9f-8563-8ca752a01f34',
//             }
//         },
//         topic: 'adminNotifications'
//     };

//     return admin.messaging().send(payload);

// })
