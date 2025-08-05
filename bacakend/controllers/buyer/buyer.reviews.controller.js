/*===========*****===========imports===========*****===========*/
import Err from "../../helpers/errors/custom.error.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import Product from "../../models/product.model.js"
import Review from "../../models/review.model.js";
/*===========*****===========imports===========*****===========*/

/*===========*****===========add review===========*****===========*/
export const create = async (req, res) => {

    const data = req.body || {};
    const validator = {};

    if (!data.rating) validator.rating = "rating field is required";
    if (!data.title) validator.title = "title field is required";
    if (!data.comment) validator.comment = "comment field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    const product = await Product.findOne({ _id: data.product });

    if (!product)
        throw new Err("Product not found", 404);

    data.product = product._id;
    data.buyer = req.auth._id;

    const review = new Review(data);

    await review.saveWithStats();
    
    return res.status(201).json(review);
}
/*===========*****===========add review===========*****===========*/


/*===========*****===========remove review===========*****===========*/
export const remove = async (req, res) => {
    const review = await Review.findOne({ _id: req.params._id, buyer: req.auth._id });

    if (!review)
        throw new Err("Review not found", 404);

    await review.deleteWithStats();

    res.status(200).json({ message: "Review Deleted" });
}
/*===========*****===========remove review===========*****===========*/