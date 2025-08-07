/*===========*****===========imports===========*****===========*/
import hasher from "../../helpers/bcrypt/hasher.bcrypt.js";
import verifier from "../../helpers/bcrypt/verifier.bcrypt.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import unlink from "../../helpers/file/unlink.file.js";
import upload from "../../helpers/file/upload.file.js";
import pager from "../../helpers/formate/pager.formate.js";
import Admin from "../../models/admin.model.js"
import { getSettings } from "../../services/caches/setting.cache.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all admins===========*****===========*/
export const all = async (req, res) => {

    const { page = 1 } = req.query;

    let admins = await Admin.find();

    const ret = {};
    ret.total = admins.length;

    const settings = await getSettings();
    const limit = 1
    const skip = (Number(page) - 1) * limit;

    admins = admins.slice(skip, skip + limit);

    ret.hits = admins.length;

    const links = await pager(Math.ceil(ret.total / limit), Number(page), "admin/protected/admins");

    res.status(200).json({
        items: admins,
        meta: { ...ret, ...links }
    });

}
/*===========*****===========all admins===========*****===========*/


/*===========*****===========one admin===========*****===========*/
export const single = async (req, res) => {

    const admin = await Admin.findById(req.params._id);

    res.status(200).json(admin);

}
/*===========*****===========one admin===========*****===========*/


/*===========*****===========delete admin===========*****===========*/
export const remove = async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params._id })

    if (!admin)
        throw new Err("Admin not found", 404);

    await admin.deleteOne();
    unlink(admin.image);

    return res.status(200).json({ message: "Admin deleted successfully." });
}
/*===========*****===========delete admin===========*****===========*/


/*===========*****===========create admin===========*****===========*/
export const create = async (req, res) => {

    const data = req.body || {};
    const validator = {};

    if (!data.name) validator.name = "name field is required";
    if (!data.email) validator.email = "email field is required";
    if (!data.password) validator.password = "password field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ["image/*"], 10, "admins");

    };

    data.password = await hasher(data.new_password);

    const admin = new Admin(data);

    await admin.save();

    return res.status(201).json({ message: "Admin Created Successfully" });
}
/*===========*****===========create admin===========*****===========*/


/*===========*****===========create admin===========*****===========*/
export const update = async (req, res) => {

    const admin = await Admin.findOne({ _id: req.params._id });

    if (!admin)
        throw new Err("Admin not found", 404);

    const data = req.body || {};
    const validator = {};

    if (!data.name) validator.name = "name field is required";
    if (!data.email) validator.email = "email field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ['image/*'], 10, "admins");
        unlink(admin.image);
    };

    if (data.new_password) {

        if (typeof data.current_password === 'undefined' || !(await verifier(data.current_password, admin.password))) {
            throw new Invalidated({ current_password: "Current password not verified" });
        }

        data.password = await hasher(data.new_password);
    }
    Object.assign(admin, data);

    await admin.save();

    return res.status(201).json(admin);
}
/*===========*****===========create admin===========*****===========*/