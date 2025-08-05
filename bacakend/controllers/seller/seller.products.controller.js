/*===========*****===========imports===========*****===========*/
import Err from "../../helpers/errors/custom.error.js";
import Invalidated from "../../helpers/errors/validation.error.js";
import unlink from "../../helpers/file/unlink.file.js";
import upload from "../../helpers/file/upload.file.js";
import pager from "../../helpers/formate/pager.formate.js";
import Product from "../../models/product.model.js"
import { getSettings } from "../../services/caches/setting.cache.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all products===========*****===========*/
export const all = async (req, res) => {
    
    const { page = 1 } = req.query;

    let products = await Product.find({ seller: req.auth._id });

    const settings = await getSettings();
    const limit = Number(settings.general.pagination);
    const skip = (Number(page) - 1) * limit

    const total = products.length;
    products = products.slice(skip, skip + limit)

    const links = await pager(Math.ceil(total / limit), Number(page), "seller/protected/products");

    res.status(200).json({
        items: products,
        nmHits: products.length,
        ...links
    });
    
}
/*===========*****===========all products===========*****===========*/


/*===========*****===========one product===========*****===========*/
export const single = async (req, res) => {
    const product = await Product.findOne({ seller: req.auth._id, _id: req.params._id })
        .populate("reviews");

    if (!product)
        throw new Err("Product not found", 404);

    res.status(200).json(product);
}
/*===========*****===========one product===========*****===========*/


/*===========*****===========delete product===========*****===========*/
export const remove = async (req, res) => {
    const product = await Product.findOne({ seller: req.auth._id, _id: req.params._id });

    if (!product)
        throw new Err("Product not found", 404);

    await product.deleteOne();
    unlink(product.image);

    return res.status(200).json({ message: "Product deleted successfully." });
}
/*===========*****===========delete product===========*****===========*/


/*===========*****===========create product===========*****===========*/
export const create = async (req, res) => {

    const data = req.body || {};
    const validator = {};

    if (!data.name) validator.name = "name field is required";
    if (!data.price) validator.price = "price field is required";
    if (!data.description) validator.description = "description field is required";
    if (!data.category) validator.category = "category field is required";
    if (!data.company) validator.company = "company field is required";
    if (!data.colors) validator.colors = "colors field is required";
    if (!data.inventory) validator.inventory = "inventory stock field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ["image/*"], 10, "products");

    };

    const product = new Product({ ...data, seller: req.auth._id });

    await product.save();

    return res.status(201).json(product);
}
/*===========*****===========create product===========*****===========*/


/*===========*****===========create product===========*****===========*/
export const update = async (req, res) => {

    const product = await Product.findOne({ seller: req.auth._id, _id: req.params._id });

    if (!product)
        throw new Err("Product not found", 404);

    const data = req.body;
    const validator = {};

    if (!data.name) validator.name = "name field is required";
    if (!data.price) validator.price = "price field is required";
    if (!data.description) validator.description = "description field is required";
    if (!data.category) validator.category = "category field is required";
    if (!data.company) validator.company = "company field is required";
    if (!data.colors) validator.colors = "colors field is required";
    if (!data.inventory) validator.inventory = "inventory stock field is required";

    if (Object.keys(validator).length > 0) throw new Invalidated(validator);

    /*----------upload image to cloudinary or server----------*/
    if (req.files && req.files.image) {
        // const cloud_response = await cloudinary.uploader.upload(data.image);
        // data.image = cloud_response.secure_url;

        data.image = await upload(req.files.image, ['image/*'], 10, "products");
        unlink(product.image);
    };

    Object.assign(product, data);

    await product.save();

    return res.status(201).json(product);
}
/*===========*****===========create product===========*****===========*/