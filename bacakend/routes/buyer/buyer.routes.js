/*===========*****===========imports===========*****===========*/
import express from "express"
import guest from "./guest.buyers.routes.js";
import verified from "./authenticated.buyers.routes.js";
import { Authenticated } from "../../middlewares/auth.middleware.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========guest-routes===========*****===========*/
router.use("/auth", guest)
/*===========*****===========guest-routes===========*****===========*/


/*===========*****===========guest-routes===========*****===========*/
router.use("/protected", Authenticated("buyer"), verified)
/*===========*****===========guest-routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router