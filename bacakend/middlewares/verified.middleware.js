/*===========*****===========imports===========*****===========*/
import Err from "../helpers/errors/custom.error.js"
/*===========*****===========imports===========*****===========*/


/*===========*****===========authenticate request===========*****===========*/
export const Verified = (req,res,next) => {

    const auth = req.auth;

    if (!auth.verified)
        throw new Err("Email Not Verified", 403);

    next();

};
/*===========*****===========authenticate request===========*****===========*/
