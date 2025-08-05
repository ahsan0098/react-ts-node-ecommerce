/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose";
/*===========*****===========imports===========*****===========*/


/*===========*****===========imports===========*****===========*/
const _schema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, "Setting key is must"],
        unique: true
    },
    value: String,
    group: {
        type: String,
        default: "general"
    },
    field: String,
    attrs: Object,
    updatedAt: { type: Date, default: Date.now }
});
/*===========*****===========imports===========*****===========*/


/*===========*****===========imports===========*****===========*/
const Setting = mongoose.model("Setting", _schema)
export default Setting;
