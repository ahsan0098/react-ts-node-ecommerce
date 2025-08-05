/*===========*****===========imports===========*****===========*/
import Err from "../../helpers/errors/custom.error.js";
import Address from "../../models/address.model.js";
import Invalidated from "../../helpers/errors/validation.error.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all address===========*****===========*/
export const all = async (req, res) => {
    const addresses = await Address.find({ buyer: req.auth._id });

    res.status(200).json(addresses);
}
/*===========*****===========all address===========*****===========*/


/*===========*****===========add address===========*****===========*/
export const add = async (req, res) => {

    const data = req.body || {};

    const validator = {};

    if (!data.country) validator.country = "country field is required";
    if (!data.city) validator.city = "city field is required";
    if (!data.state) validator.state = "state field is required";
    if (!data.address) validator.address = "address field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    const exists = await Address.findOne({ street: data.street, address: data.address, buyer: req.auth._id });
    if (exists) return res.status(400).json({ message: "Address already exists" });

    const address = new Address({ ...data, buyer: req.auth._id });

    await address.save();

    return res.status(201).json(address);
}
/*===========*****===========add address===========*****===========*/


/*===========*****===========remove address===========*****===========*/
export const remove = async (req, res) => {
    const address = await Address.findOne({ _id: req.params._id, buyer: req.auth._id });

    if (!address)
        throw new Err("Address not found", 404);

    await address.deleteOne();

    res.status(200).json({ message: "Address removed" });
}
/*===========*****===========remove address===========*****===========*/