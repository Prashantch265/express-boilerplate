const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { mailerConfig } = require("../config/config");
const path = require("path");

const nodeMailer = (data) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(mailerConfig);

    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };

    // use a template file with nodemailer
    transporter.use("compile", hbs(handlebarOptions));

    let mailOptions = {
      from: `Prashant Chaudhary <${mailerConfig.auth.user}>`, // sender address
      to: [data.reciever], // list of receivers
      subject: `${data.subject}`,
      template: `${data.templateFile}`, // the name of the template file i.e email.handlebars
      context: data.context,
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log("Message sent: " + info.response);
      resolve(`mail sent to ${data.reciever} successfully`);
    });
  });
};

module.exports = { nodeMailer };
