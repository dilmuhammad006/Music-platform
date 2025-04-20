import { config } from "dotenv";
import { BaseException } from "../middlewares/base.exception.js";
import transporter from "../config/mail.config.js";

config();
const sendMail = async ({ to, subject, text = "", html = "" }) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    });

    return mail.messageId;
  } catch (error) {
    console.log("Error while sending  message", error.message);
    throw new BaseException("Error while sending message", 500);
  }
};

export default sendMail;
