/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose"
/*===========*****===========imports===========*****===========*/


/*===========*****===========schema===========*****===========*/
const _schema = new mongoose.Schema(
    {

        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'Buyer',
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

_schema.index(
    { buyer: 1, product: 1 },
    { unique: true }
);
/*===========*****===========schema===========*****===========*/


/*===========*****===========export===========*****===========*/
const Wishlist = mongoose.model("Wishlist", _schema)
export default Wishlist;