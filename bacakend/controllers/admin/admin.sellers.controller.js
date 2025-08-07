/*===========*****===========imports===========*****===========*/
import pager from "../../helpers/formate/pager.formate.js";
import Product from "../../models/product.model.js";
import Seller from "../../models/seller.model.js"
import { getSettings } from "../../services/caches/setting.cache.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========all sellers===========*****===========*/
export const all = async (req, res) => {

    const { page = 1 } = req.query;

    let sellers = await Seller.find();

    const settings = await getSettings();
    const limit = Number(settings.general.pagination);
    const skip = (Number(page) - 1) * limit

    const total = sellers.length;
    sellers = sellers.slice(skip, skip + limit)

    const links = await pager(Math.ceil(total / limit), Number(page), "admin/protected/admins");

    res.status(200).json({
        items: sellers,
        nmHits: sellers.length,
        ...links
    });

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