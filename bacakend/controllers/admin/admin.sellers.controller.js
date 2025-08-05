/*===========*****===========imports===========*****===========*/
import Product from "../../models/product.model.js";
import Seller from "../../models/seller.model.js"
/*===========*****===========imports===========*****===========*/


/*===========*****===========all sellers===========*****===========*/
export const all = async (req, res) => {

    const sellers = await Seller.find();

    res.status(200).json(sellers);

}
/*===========*****===========all sellers===========*****===========*/


/*===========*****===========one seller===========*****===========*/
export const single = async (req, res) => {

    const seller = await Seller.findById(req.params._id);

    res.status(200).json(seller);

}
/*===========*****===========one seller===========*****===========*/


/*===========*****===========seller product===========*****===========*/
export const products = async (req, res) => {

    const products = await Product.find({ seller: req.params._id });

    res.status(200).json(products);
}
/*===========*****===========seller product===========*****===========*/