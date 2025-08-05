/*===========*****===========imports===========*****===========*/
import express from "express"
import guest from "./guest.sellers.routes.js";
import verified from "./verified.sellers.routes.js";
import { Authenticated } from "../../middlewares/auth.middleware.js";
import * as profile from "../../controllers/seller/seller.profile.controller.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========guest-routes===========*****===========*/
router.use("/auth", guest)
/*===========*****===========guest-routes===========*****===========*/


/*===========*****===========profile===========*****===========*/
router.get("/protected/send-email", Authenticated("seller"), profile.sendmail);
/*===========*****===========profile===========*****===========*/


/*===========*****===========profile===========*****===========*/
router.get("/protected/verify-email", Authenticated("seller"), profile.verify);
/*===========*****===========profile===========*****===========*/


/*===========*****===========profile===========*****===========*/
router.put("/protected/update-profile", Authenticated("seller"), profile.update);
/*===========*****===========profile===========*****===========*/


/*===========*****===========guest-routes===========*****===========*/
router.use("/protected", Authenticated("seller"), verified)
/*===========*****===========guest-routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router