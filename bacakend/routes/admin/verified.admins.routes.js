/*===========*****===========imports===========*****===========*/
import express from "express"
import * as admins from "../../controllers/admin/admin.admins.controller.js";
import * as sellers from "../../controllers/admin/admin.sellers.controller.js";
import * as products from "../../controllers/admin/admin.products.controller.js";
import fileUpload from "express-fileupload"
/*===========*****===========imports===========*****===========*/

/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/

/*===========*****===========admins routes===========*****===========*/
router.get("/admins", admins.all);

router.post("/admins/create", fileUpload(), admins.create);

router.get("/admins/:_id/get", admins.single);

router.put("/admins/:_id/update", fileUpload(), admins.update);

router.delete("/admins/:_id/delete", admins.remove);
/*===========*****===========admins routes===========*****===========*/


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