/*===========*****===========imports===========*****===========*/
import generateToken from "../../helpers/jwt/create.jwt.js";
import Admin from "../../models/admin.model.js";
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

    const verificationLink = `${process.env.APP_URL}/api/v1/admin/protected/verify-email?token=${token}`;

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
        res.json({ message: "Email sent! Check inbox" })
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
        return res.redirect(`${process.env.FRONTEND_URL}/admin/profile?error=Token expired or invalid. try sending a new verification email`);
    }

    const admin = await Admin.findById(decoded._id);

    if (!admin) {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/profile?error=This token does not belong to you. Please try correct one`);
    }

    if (admin.verified) {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/profile`);
    }

    admin.verified = true;
    await admin.save();

    generateToken({ ...admin.toJSON(), role: "admin" }, res);

    return res.redirect(`${process.env.FRONTEND_URL}/admin/profile?success=Email verified successfully`);
};

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

    const admin = await Admin.findOne({ _id: req.auth._id });

    /*----------hash new password----------*/
    if (data.new_password) {

        if (typeof data.current_password === 'undefined' || !(await verifier(data.current_password, admin.password))) {
            throw new Invalidated({ current_password: "Current password not verified" });
        }

        data.password = await hasher(data.new_password);

    }


    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ["image/*"], 10, "admins");
        unlink(admin.image)
    };

    /*----------update admin fields----------*/
    Object.assign(admin, data);

    await admin.save({ runValidators: true });

    generateToken({ ...admin.toJSON(), role: "admin" }, res);

    /*----------return response----------*/
    return res.status(200).json(admin);

}
/*===========*****===========profile update===========*****===========*/