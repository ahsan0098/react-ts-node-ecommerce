/*===========*****===========imports===========*****===========*/
import generateToken from "../../helpers/jwt/create.jwt.js";
import Admin from "../../models/admin.model.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import Err from "../../helpers/errors/custom.error.js";
import jwt from "jsonwebtoken"
import hasher from "../../helpers/bcrypt/hasher.bcrypt.js";
import verifier from "../../helpers/bcrypt/verifier.bcrypt.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========signup===========*****===========*/
export const signup = async (req, res) => {

    const data = { ...req.body };

    let validator = {}

    /*----------validate email----------*/
    if (await Admin.findOne({ email: data.email })) {
        validator.email = "Email already exists.";
    }

    if (!data.name) validator.name = "Name field is required";
    if (!data.email) validator.email = "Email field is required";
    if (!data.password) validator.password = "Password field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator)

    /*----------create admin and token----------*/
    const admin = new Admin(data);

    if (admin) {

        admin.password = await hasher(data.password);

        await admin.save();

        generateToken({ ...admin.toJSON(), role: "admin" }, res);
        /*----------return response----------*/
        return res.status(201).json(admin);

    }

    /*----------return response----------*/
    return res.status(500).json("failed to create admin");

}
/*===========*****===========signup===========*****===========*/


/*===========*****===========login===========*****===========*/
export const login = async (req, res) => {
    // logout(req, res)
    const data = { ...req.body };

    /*----------validate----------*/
    if (!data.email || !data.password) {
        throw new Invalidated({
            email: !data.email && "Email filed is required",
            password: !data.password && "Password filed is required.",
        });
    }

    /*----------login admin and token----------*/
    const admin = await Admin.findOne({ email: data.email });

    if (!admin || !await verifier(data.password,admin.password)) {
        throw new Err("Credentials Did'nt Match", 403)
    }

    generateToken({ ...admin.toJSON(), role: "admin" }, res);

    /*----------return response----------*/
    return res.status(200).json(admin);

}
/*===========*****===========login===========*****===========*/


/*===========*****===========logout===========*****===========*/
export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    return res.status(200).json({ message: "Logged Out Successfully" });

}
/*===========*****===========logout===========*****===========*/


/*===========*****===========auth check===========*****===========*/
export const check = (req, res) => {

    const token = req.cookies?.jwt;
    if (!token) throw new Err("Unauthenticated", 403);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            throw new Err("Forbidden", 403);
        }

        return res.status(200).json(decoded);

    } catch (err) {

        throw new Err("Unverified", 403);
    }
}
/*===========*****===========auth check===========*****===========*/