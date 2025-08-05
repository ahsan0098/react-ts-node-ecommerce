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

        otp: {
            type: String,
            default: ""
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
    { timeseries: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
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


/*===========*****===========wishlists===========*****===========*/
_schema.virtual("wishlists", {
    ref: 'Wishlist', 
    localField: '_id',
    foreignField: 'buyer',
    justOne: false,
    options: { populate: { path: 'product' } }
});
/*===========*****===========wishlists===========*****===========*/


/*===========*****===========export===========*****===========*/
const Buyer = mongoose.model("Buyer", _schema)
export default Buyer;