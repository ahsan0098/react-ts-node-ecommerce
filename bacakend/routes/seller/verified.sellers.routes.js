/*===========*****===========imports===========*****===========*/
import express from "express"
import * as products from "../../controllers/seller/seller.products.controller.js";
import fileUpload from "express-fileupload";
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========products routes===========*****===========*/
router.get("/products", products.all);

router.post("/products/create", products.create);

router.get("/products/:_id/get", products.single);

router.put("/products/:_id/update",fileUpload(), products.update);

router.delete("/products/:_id/delete", products.remove);
/*===========*****===========products routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router;