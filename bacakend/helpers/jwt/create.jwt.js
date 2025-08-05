/*===========*****===========imports===========*****===========*/
import jwt from "jsonwebtoken";
/*===========*****===========imports===========*****===========*/

const generateToken = (user, res) => {
    try {

        /*===========*****===========generate token===========*****===========*/
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        });
        /*===========*****===========generate token===========*****===========*/



        /*===========*****===========set cookie===========*****===========*/
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.APP_MODE !== "development"
        })
        /*===========*****===========set cookie===========*****===========*/
    } catch (error) {
        throw new Error("failed to generate token : " + error.message)
    }
}



/*===========*****===========export===========*****===========*/
export default generateToken