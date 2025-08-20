import pager from "./../helpers/formate/pager.formate.js";
import Product from "./../models/product.model.js";
import { getSettings } from "./../services/caches/setting.cache.js";
import Seller from "../models/seller.model.js";

const resolvers = {
    Query: {
        
        products: async (parent, args) => {
            const { page = 1, search = "", price, ...sorts } = args;

            let filter = {
                ...sorts,
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { company: { $regex: search, $options: "i" } },
                ],
            };

            if (price) {
                filter.price = {};
                for (const part of price.split("|")) {
                    if (part.startsWith(">="))
                        filter.price.$gte = parseFloat(part.slice(2));
                    else if (part.startsWith("<="))
                        filter.price.$lte = parseFloat(part.slice(2));
                }
            }

            let products = await Product.find(filter).populate("seller");

            const settings = await getSettings();
            const limit = Number(settings.general.pagination);
            const skip = (Number(page) - 1) * limit;

            const total = products.length;
            products = products.slice(skip, skip + limit);

            const links = await pager(Math.ceil(total / limit), Number(page), "products");

            return {
                items: products,
                nmHits: products.length,
                totalPages: Math.ceil(total / limit),
                currentPage: Number(page),
                hasNextPage: Number(page) < Math.ceil(total / limit),
                hasPrevPage: Number(page) > 1,
            };
        },

        product: async (parent, args) => {
            const product = await Product.findOne({ _id: args._id }).populate("seller");

            if (!product) {
                throw new Error("Product not found");
            }

            return product;
        },
    },
};

export default resolvers;
