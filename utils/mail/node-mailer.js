const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const ejs = require("ejs");
const { mailerConfig } = require("../../config/config");
const { logger } = require("../logging/logger");
const path = require("path");

/**
 * Sends an email using the configured template engine.
 * @param {Object} data - The email data, including receiver, subject, template file, and context.
 * @returns {Promise<string>} A promise that resolves with a success message or rejects with an error.
 */
const nodeMailer = (data) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(mailerConfig);
    const templateEngine = mailerConfig.templateEngine;

    try {
      if (templateEngine === "handlebars") {
        // Handlebars setup
        const handlebarOptions = {
          viewEngine: {
            partialsDir: path.resolve("./views/"),
            defaultLayout: false,
          },
          viewPath: path.resolve("./views/"),
        };
        transporter.use("compile", hbs(handlebarOptions));
        logger.info("Handlebars template engine configured.");
      } else if (templateEngine === "ejs") {
        // EJS setup
        transporter.use("compile", (mail, callback) => {
          ejs.renderFile(
            path.join(__dirname, "../../views", `${data.templateFile}.ejs`),
            data.context,
            (err, renderedHtml) => {
              if (err) {
                logger.error(`Error rendering EJS template: ${err.message}`);
                return callback(err);
              }
              mail.data.html = renderedHtml;
              callback();
            }
          );
        });
        logger.info("EJS template engine configured.");
      } else {
        throw new Error(`Unsupported template engine: ${templateEngine}`);
      }

      const mailOptions = {
        from: `Prashant Chaudhary <${mailerConfig.auth.user}>`, // sender address
        to: [data.reciever], // list of receivers
        subject: `${data.subject}`,
        template:
          templateEngine === "handlebars" ? data.templateFile : undefined, // Only set for Handlebars
        context: templateEngine === "handlebars" ? data.context : undefined,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(`Failed to send email: ${error.message}`);
          return reject(error);
        }
        logger.info(`Message sent: ${info.response}`);
        resolve(`Mail sent to ${data.reciever} successfully`);
      });
    } catch (err) {
      logger.error(`Mailer setup failed: ${err.message}`);
      reject(err);
    }
  });
};

module.exports = { nodeMailer };
