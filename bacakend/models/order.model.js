/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose"
/*===========*****===========imports===========*****===========*/


/*===========*****===========schema===========*****===========*/
const _schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },

        address: {
            type: mongoose.Schema.ObjectId,
            ref: 'Address',
            required: true,
        },

        transaction: {
            type: mongoose.Schema.ObjectId,
            ref: 'Transaction',
            required: true,
        },

        gst: {
            type: Number,
            required: true,
        },

        shippingCharges: {
            type: Number,
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
        },

        total: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending',
        },

    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
/*===========*****===========schema===========*****===========*/


/*===========*****===========items===========*****===========*/
_schema.virtual("items", {
    ref: "OrderItem",
    localField: "_id",
    foreignField: "order",
    justOne: false
});
/*===========*****===========items===========*****===========*/


/*===========*****===========export===========*****===========*/
const Order = mongoose.model("Order", _schema)
export default Order;