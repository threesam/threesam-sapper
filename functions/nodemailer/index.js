// const nodemailer = require('nodemailer')

// exports.handler = function (event, context, callback) {

//   let data = JSON.parse(event.body)

//     let transporter = nodemailer.createTransport({
//       host: process.env.SMTP_SERVER,
//       port: process.env.SMTP_SERVER_PORT,
//       auth: {
//         user: process.env.SMTP_USERNAME,
//         pass: process.env.SMTP_PASSWORD
//     }
//     });

//     transporter.sendMail({
//       from: process.env.SERVER_EMAIL,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: `Sending with React, Nodemailer and Netlify`,
//       html: `
//             <h3>Email from ${data.name} ${data.email}<h3>
//             <p>${data.message}<p>
//             `
//     }, function (error, info) {
//         if (error) {
//           callback(error);
//         } else {
//             callback(null, {
//             statusCode: 200,
//               body: JSON.stringify({
//                 'result': 'success'
//                 })
//             });
//         }
//     });
// }