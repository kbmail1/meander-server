"use strict";
import * as nodemailer from 'nodemailer'

export const sendEmail = async (code: string) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kundan.bapat@gmail.com',
      // app specific password for this MAC from gmail.
      pass: 'dgwmpwxfjrplyhrt'
    }
  });

  const mailOptions = {
    from: 'kundan.bapat@gmail.com',
    to: 'kundan.bapat@gmail.com',
    subject: 'Invoices due',
    html: `<h4>Please enter this code on the signup form</h4>
    <h2>${code}</h2>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // only Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}