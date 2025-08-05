/*===========*****===========imports===========*****===========*/
import express from "express"
import sellers from "./seller/seller.routes.js";
import buyers from "./buyer/buyer.routes.js";
import admins from "./admin/admin.routes.js";
import visitors from "./visitor/visitor.routes.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========buyer-routes===========*****===========*/
router.use("/buyer", buyers)
/*===========*****===========buyer-routes===========*****===========*/


/*===========*****===========seller-routes===========*****===========*/
router.use("/seller", sellers)
/*===========*****===========seller-routes===========*****===========*/


/*===========*****===========admin-routes===========*****===========*/
router.use("/admin", admins)
/*===========*****===========admin-routes===========*****===========*/


/*===========*****===========visitor-routes===========*****===========*/
router.use("/", visitors)
/*===========*****===========visitor-routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router