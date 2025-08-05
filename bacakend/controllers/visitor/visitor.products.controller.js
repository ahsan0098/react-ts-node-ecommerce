/*===========*****===========imports===========*****===========*/
import Err from "../../helpers/errors/custom.error.js";
import pager from "../../helpers/formate/pager.formate.js";
import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";
import { getSettings } from "../../services/caches/setting.cache.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all products===========*****===========*/
export const all = async (req, res) => {

    const { page = 1, search = '', price, ...sorts } = req.query;

    let filter = {
        ...sorts,
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } }
        ]
    }

    if (price) {
        filter.price = {};

        for (const part of price.split("|")) {
            if (part.startsWith(">=")) filter.price.$gte = parseFloat(part.slice(2));
            else if (part.startsWith("<=")) filter.price.$lte = parseFloat(part.slice(2));
        }
        
    }

    let products = await Product.find(filter).populate('seller');

    const settings = await getSettings();
    const limit = Number(settings.general.pagination);
    const skip = (Number(page) - 1) * limit

    const total = products.length;
    products = products.slice(skip, skip + limit)

    const links = await pager(Math.ceil(total / limit), Number(page), "products");

    res.status(200).json({
        items: products,
        nmHits: products.length,
        ...links
    });
}
/*===========*****===========all products===========*****===========*/


/*===========*****===========one product===========*****===========*/
export const single = async (req, res) => {
    const product = await Product.findOne({ _id: req.params._id })
        .populate('seller');

    if (!product)
        throw new Err("Product not found", 404);

    res.status(200).json(product);
}
/*===========*****===========one product===========*****===========*/


/*===========*****===========reviews===========*****===========*/
export const reviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.product });

    res.status(200).json(reviews);
}
/*===========*****===========reviews===========*****===========*/