/*===========*****===========imports===========*****===========*/
import generateToken from "../../helpers/jwt/create.jwt.js";
import Seller from "../../models/seller.model.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import upload from "../../helpers/file/upload.file.js";
import unlink from "../../helpers/file/unlink.file.js";
import config from "../../config/site.config.js";
import transporter from "../../services/mails/transporter.mail.service.js";
import Err from "../../helpers/errors/custom.error.js";
import jwt from "jsonwebtoken"
import hasher from "../../helpers/bcrypt/hasher.bcrypt.js";
import verifier from "../../helpers/bcrypt/verifier.bcrypt.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========send email verification===========*****===========*/
export const sendmail = (req, res) => {

    if (req.auth.verified) {
        return res.status(200).json({ message: "Email Already Verified." });
    }

    const token = jwt.sign(
        {
            _id: req.auth._id,
            email: req.auth.email,
            type: 'email_verify',
        },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    );

    const verificationLink = `${process.env.APP_URL}/api/v1/seller/protected/verify-email?token=${token}`;

    const opts = {
        from: `${config.sitename} <` + config.siteemail + `>`,
        to: req.auth.email,
        subject: 'Email Verification',
        html: '<b>Hello, this is an HTML email!</b> <a href="' + verificationLink + '">Click to verify</a>',
    };

    transporter.sendMail(opts, (err, info) => {
        if (err) {
            throw new Err('Error while sending email:', err);
        }
        res.json(info)
    });
}
/*===========*****===========send email verification===========*****===========*/


/*===========*****===========verify email===========*****===========*/
export const verify = async (req, res) => {

    const { token } = req.query;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Err("Token Expired or Invalid", 403)
    }

    const seller = await Seller.findById(decoded._id);

    if (seller.verified) {
        return res.status(200).json({ message: "Email Already Verified." });
    }

    seller.verified = true;
    await seller.save();

    generateToken({ ...seller.toJSON(), role: "seller" }, res);

    return res.status(200).json({ message: "Email Successfully Verified." });
}
/*===========*****===========verify email===========*****===========*/


/*===========*****===========profile update===========*****===========*/
export const update = async (req, res) => {

    const data = { ...req.body };

    /*----------validate----------*/
    if (!data.email || !data.name) {
        throw new Invalidated({
            email: !data.email && "Email filed is required",
            name: !data.name && "Name filed is required.",
        });
    }

    const seller = await Seller.findOne({ _id: req.auth._id });

    /*----------hash new password----------*/
    if (data.password) {

        if (typeof data._password === 'undefined' || !(await verifier(data._password, seller.password))) {
            throw new Invalidated({ password: "Current password must be verified" });
        }

        data.password = await hasher(data.password);

    }


    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ["image/*"], 10, "sellers");
        unlink(seller.image)
    };

    /*----------update seller fields----------*/
    Object.assign(seller, data);

    await seller.save({ runValidators: true });

    generateToken({ ...seller.toJSON(), role: "seller" }, res);

    /*----------return response----------*/
    return res.status(200).json(seller);

}
/*===========*****===========profile update===========*****===========*/