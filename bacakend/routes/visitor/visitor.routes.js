/*===========*****===========imports===========*****===========*/
import express from "express";
import * as product from "./../../controllers/visitor/visitor.products.controller.js"
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========products===========*****===========*/
router.get("/products", product.all);

router.get("/products/:_id/get", product.single);

router.get("/products/:product/reviews", product.reviews);
/*===========*****===========products===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router