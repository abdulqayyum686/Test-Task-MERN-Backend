const nodemailer = require("nodemailer");
function sendEmail(to, subject, password) {
  console.log(to, subject, password);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "qayyuma686@gmail.com",
      pass: "ziyfvpktqpmamnru",
    },
  });
  const message = {
    from: "qayyuma686@gmail.com",
    to: to,
    subject: subject,
    html: `<html><div style=\"font-family: Arial, sans-serif; color: #333333; background-color: #f5f5f5; padding: 30px;\">
    <div style=\"max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);\">
      <div style=\"padding: 30px;\">
        <h2 style=\"text-align: center; margin-top: 30px; margin-bottom: 0;\">Welcome to our platform</h2>
        <h2 style=\"text-align: center; margin-top: 30px; margin-bottom: 0;\">Your password is : ${password} </h2>
      </div>
      <div style=\"background-color: #1f88be; color: white; text-align: center; padding: 10px; font-size: 14px;\">
        <p style=\"margin: 0;\">If you did not sign up for this service, please disregard this email.</p>
      </div>
    </div>
  </div></html>`,
  };

  transporter.sendMail(message, async function (error, info) {
    if (error) {
      console.log(error);
      throw new Error("Mail not sent");
    } else {
      console.log("Email sent acccepted: =>" + info.response);
      // res.status(200).json({
      //     message: "OTP has been sent to your mail please check your email",
      // });
      return true;
    }
  });
}

module.exports = sendEmail;
