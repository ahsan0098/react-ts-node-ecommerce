/*===========*****===========imports===========*****===========*/
import generateToken from "../../helpers/jwt/create.jwt.js";
import Seller from "../../models/seller.model.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import Err from "../../helpers/errors/custom.error.js";
import jwt from "jsonwebtoken"
import verifier from "../../helpers/bcrypt/verifier.bcrypt.js";
import hasher from "../../helpers/bcrypt/hasher.bcrypt.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========signup===========*****===========*/
export const signup = async (req, res) => {

    const data = { ...req.body };

    let validator = {}

    /*----------validate email----------*/
    if (await Seller.findOne({ email: data.email })) {
        validator.email = "Email already exists.";
    }

    if (!data.name) validator.name = "Name field is required";
    if (!data.email) validator.email = "Email field is required";
    if (!data.password) validator.password = "Password field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator)

    /*----------create seller and token----------*/
    const seller = new Seller(data);

    if (seller) {

        seller.password = await hasher(data.password);

        await seller.save();

        generateToken({ ...seller.toJSON(), role: "seller" }, res);
        /*----------return response----------*/
        return res.status(201).json(seller);

    }

    /*----------return response----------*/
    return res.status(500).json("failed to create seller");

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

    /*----------login seller and token----------*/
    const seller = await Seller.findOne({ email: data.email });

    if (!seller || !await verifier(data.password, seller.password)) {
        throw new Err("Credentials Did'nt Match", 403)
    }
    generateToken({ ...seller.toJSON(), role: "seller" }, res);

    /*----------return response----------*/
    return res.status(200).json(seller);

}
/*===========*****===========login===========*****===========*/


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

        if (decoded.role !== "seller") {
            throw new Err("Forbidden", 403);
        }

        return res.status(200).json(decoded);

    } catch (err) {

        throw new Err("Unverified", 403);
    }

}
/*===========*****===========logout===========*****===========*/