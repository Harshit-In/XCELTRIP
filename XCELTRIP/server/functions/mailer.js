const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapperm
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service:"Gmail", // true for 465, false for other ports
    secure: true,//true
  port: 465,
    auth: {
      user: "harshit.inrx@gmail.com", // generated ethereal user
      pass: "Test@123", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'harshit.inrx@gmail.com', // sender address
    to: "thorbond2020@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: sendOtp, // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

function sendOTP(to, otp) {
  const subject = "GlobelDiffi Account Varification Code";
  const logo_url = 'https://bitflash.io/theme/img/logo.png';
  const website_url = 'https://GlobelDiffi.io/';
  const website_name = 'GlobelDiffi';
  const organisation_addr = '<p>211002 STPI Prayagraj</p><p> Uttar Pradesh, India</p>';
  const title = 'GlobelDiffi.io';
  const html = generateOtpHTML(otp, to, { logo: logo_url, website: website_url, name: website_name, address: organisation_addr, title}, 1);
  sendMail({ to, subject, html});
}
module.exports = {
    main
}

function sendMail(data) {
  try {
      const { to, subject } = data;
      let info = {
          from: {
              name: "harshit.inrx@gmail.com",
              address: "Test@123"
          },
          to: "thorbond2020@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
      };
      transporter.sendMail(info, (function (error, data) {
          if (error) {
              console.log("error occurs", error)
          } else {
              console.log("email sent", data)
          }
      }));
  } catch (error) {
      console.log("Error: from utils > mailer.js > sendMail: ", error.message);
  }
}


generateOtpHTML = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
        <a href="$" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img src="" style="max-height: 30px;" /></a>
    </div>
    <p style="font-size:1.1em">Your Deposit is successfully Updated.</p>
    <p>Remark:GlobelDiffPool</p>
    <p style="font-size:0.9em;">Regards,<br /></p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Hello Bro</p>
        
    </div>
</div>
</div>`;