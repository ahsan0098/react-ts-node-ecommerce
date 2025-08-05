/*===========*****===========imports===========*****===========*/
import generateToken from "../../helpers/jwt/create.jwt.js";
import Buyer from "../../models/buyer.model.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import Err from "../../helpers/errors/custom.error.js";
import jwt from "jsonwebtoken"
import transporter from "../../services/mails/transporter.mail.service.js";
import config from "../../config/site.config.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========signup===========*****===========*/
export const sign = async (req, res) => {

    const data = { ...req.body };

    const validator = {}

    if (!data.name) validator.name = "Name field is required";
    if (!data.email) validator.email = "Email field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator)

    /*----------create or update----------*/
    let buyer = await Buyer.findOne({ email: data.email })

    if (!buyer)
        buyer = new Buyer({ email: data.email });

    buyer.name = data.name;
    buyer.otp = Math.floor(100000 + Math.random() * 900000);

    await buyer.save();

    /*----------send to verify----------*/
    sendmail(req, res, buyer);

}
/*===========*****===========signup===========*****===========*/


/*===========*****===========send email verification===========*****===========*/
const sendmail = (req, res, buyer) => {

    const opts = {
        from: `${config.sitename} <` + config.siteemail + `>`,
        to: buyer.email,
        subject: 'Login OTP Verification',
        html: `<b>Hello, this is an HTML email!</b> Your OTP is <strong >${buyer.otp}</strong>`,
    };

    transporter.sendMail(opts, (err, info) => {
        if (err) {
            throw new Err('Error while sending email:', err);
        }
        res.json({ message: "OTP send to email. Check Inbox" });
    });
}
/*===========*****===========send email verification===========*****===========*/


/*===========*****===========verify email===========*****===========*/
export const verify = async (req, res) => {

    const { otp } = req.body;

    const buyer = await Buyer.findOne({ otp: otp });

    if (!buyer || !buyer.otp)
        throw new Err("Invalid OTP")

    buyer.verified = true;
    buyer.otp = "";
    await buyer.save();

    generateToken({ ...buyer.toJSON(), role: "buyer" }, res);

    return res.status(200).json(buyer);
}
/*===========*****===========verify email===========*****===========*/


/*===========*****===========logout===========*****===========*/
export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    return res.status(200).json({ message: "Logged Out Successfully" });
}
/*===========*****===========logout===========*****===========*/


/*===========*****===========logout===========*****===========*/
export const check = (req, res) => {

    const token = req.cookies?.jwt;
    if (!token) throw new Err("Unauthenticated", 403);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "buyer") {
            throw new Err("Forbidden", 403);
        }

        return res.status(200).json(decoded);

    } catch (err) {

        throw new Err("Unverified", 403);
    }

}
/*===========*****===========logout===========*****===========*/