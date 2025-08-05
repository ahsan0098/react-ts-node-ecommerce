/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose"
import validator from "validator"
/*===========*****===========imports===========*****===========*/


/*===========*****===========schema===========*****===========*/
const _schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'email must be provided'],
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email"
            }
        },

        name: {
            type: String,
            required: [true, 'name must be provided'],

        },

        password: {
            type: String,
            required: false,
            min: 6
        },

        image: {
            type: String,
            default: ""
        },

        verified: {
            type: Boolean,
            default: false
        },

    },
    { timeseries: true }
);
/*===========*****===========schema===========*****===========*/


/*===========*****===========cast response object===========*****===========*/
_schema.set('toJSON', {
    transform: function (doc, ret) {
        return {
            _id: ret._id.toString(),
            name: ret.name,
            email: ret.email,
            image: ret.image,
            verified: ret.verified,
        };
    }
});
/*===========*****===========cast response object===========*****===========*/


/*===========*****===========export===========*****===========*/
const Seller = mongoose.model("Seller", _schema)
export default Seller;