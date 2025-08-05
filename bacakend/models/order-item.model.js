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

        discount: {
            type: Number,
            default: 0
        },

        discounted: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/*===========*****===========schema===========*****===========*/


/*===========*****===========export===========*****===========*/
const OrderItem = mongoose.model("OrderItem", _schema)
export default OrderItem;