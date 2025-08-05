/*===========*****===========imports===========*****===========*/
import Err from "../helpers/errors/custom.error.js"
import jwt from "jsonwebtoken"
/*===========*****===========imports===========*****===========*/


/*===========*****===========authenticate request===========*****===========*/
export const Authenticated = (role = null) => {
    return (req, res, next) => {
        const token = req.cookies?.jwt;
        if (!token) throw new Err("Unauthenticated", 403);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Err("Unverified", 403);
        }

        // Check role if specified
        if (decoded.role !== role) {
            throw new Err("Forbidden", 403);
        }

        req.auth = decoded;
        next();
    };
};
/*===========*****===========authenticate request===========*****===========*/
