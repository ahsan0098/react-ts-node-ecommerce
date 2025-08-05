/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose";
import Invalidated from "../helpers/errors/validation.error.js";
/*===========*****===========imports===========*****===========*/


const JsonErrors = (err, req, res, next) => {

    /*---------- Handle Mongoose validation errors ----------*/
    if (err instanceof mongoose.Error.ValidationError) {
        const formatted = Object.values(err.errors).reduce((acc, item) => {
            acc[item.path] = item.message;
            return acc;
        }, {});

        return res.status(422).json(formatted);
    }

    /*---------- Handle custom Invalidated errors ----------*/
    if (err instanceof Invalidated) {
        return res.status(err.statusCode || 422).json(err.errors);
    }

    /*---------- Handle all other errors ----------*/
    const statusCode = err.statusCode ? err.statusCode : 500;
    let msg = err.message || "Error occurred";

    if (statusCode >= 500) {
        console.error(err);
        msg = "Something went wrong.";
    }

    return res.status(statusCode).json({
        message: msg,
    });
};

/*===========*****===========export===========*****===========*/
export default JsonErrors;
