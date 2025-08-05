/*===========*****===========imports===========*****===========*/
import nodemailer from "nodemailer";
/*===========*****===========imports===========*****===========*/


/*===========*****===========env init===========*****===========*/
import dotenv from "dotenv";
dotenv.config();
/*===========*****===========env init===========*****===========*/


/*===========*****===========email options===========*****===========*/
const transporter = nodemailer.createTransport({
  host: process.env.MAILER,
  port: Number(process.env.MAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.HOST_USER,
    pass: process.env.HOST_PASS, 
  },
});

/*===========*****===========export===========*****===========*/
export default transporter;