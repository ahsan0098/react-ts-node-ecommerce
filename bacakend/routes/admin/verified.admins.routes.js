/*===========*****===========imports===========*****===========*/
import express from "express"
import * as sellers from "../../controllers/admin/admin.sellers.controller.js";
import * as products from "../../controllers/admin/admin.products.controller.js";
/*===========*****===========imports===========*****===========*/

/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/

/*===========*****===========sellers routes===========*****===========*/
router.get("/sellers", sellers.all);

router.get("/sellers/:_id/get", sellers.single);

router.get("/sellers/:_id/products", sellers.products);
/*===========*****===========sellers routes===========*****===========*/


/*===========*****===========products routes===========*****===========*/
router.get("/products", products.all);

router.post("/products/create", products.create);

router.get("/products/:_id/get", products.single);

router.put("/products/:_id/update", products.update);

router.delete("/products/:_id/delete", products.remove);
/*===========*****===========products routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router;