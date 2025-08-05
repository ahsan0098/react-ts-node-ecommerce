/*===========*****===========imports===========*****===========*/
import Err from "../../helpers/errors/custom.error.js";
import Product from "../../models/product.model.js"
import Wishlist from "../../models/wishlist.model.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all wishlist===========*****===========*/
export const all = async (req, res) => {
    const wishlists = await Wishlist.find({ buyer: req.auth._id }).populate("product");

    res.status(200).json(wishlists);
}
/*===========*****===========all wishlist===========*****===========*/


/*===========*****===========add wishlist===========*****===========*/
export const add = async (req, res) => {

    const data = req.body || {};

    const product = await Product.findOne({ _id: data.product });

    if (!product)
        throw new Err("Product not found", 404);

    const exists = await Wishlist.findOne({ product: data.product, buyer: req.auth._id });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const wishlist = new Wishlist({ product: data.product, buyer: req.auth._id });

    await wishlist.save();

    return res.status(201).json(wishlist);
}
/*===========*****===========add wishlist===========*****===========*/


/*===========*****===========remove wishlist===========*****===========*/
export const remove = async (req, res) => {
    const wishlist = await Wishlist.findOne({ _id: req.params._id, buyer: req.auth._id });

    if (!wishlist)
        throw new Err("Wishlist item not found", 404);

    await wishlist.deleteOne();

    res.status(200).json({ message: "Wishlist item removed" });
}
/*===========*****===========remove wishlist===========*****===========*/