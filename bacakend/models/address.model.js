/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose"
import Product from "./product.model.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========schema===========*****===========*/
const _schema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'Buyer',
            required: true,
        },
        country: {
            type: String,
            trim: true,
            required: [true, 'Please provide your country'],
            maxlength: 100,
        },

        state: {
            type: String,
            trim: true,
            required: [true, 'Please provide your state'],
            maxlength: 100,
        },

        city: {
            type: String,
            trim: true,
            required: [true, 'Please provide your city'],
            maxlength: 100,
        },

        street: {
            type: String,
            trim: true,
            required: false,
            maxlength: 100,
        },

        address: {
            type: String,
            trim: true,
            required: [true, 'Please provide complete address'],
        },

        comment: {
            type: String,
            required: false,
        }

    },
    { timestamps: true }
);

_schema.index(
    { buyer: 1, street: 1, address: 1 },
    { unique: true }
);
/*===========*****===========schema===========*****===========*/


/*===========*****===========export===========*****===========*/
const Address = mongoose.model("Address", _schema)
export default Address;