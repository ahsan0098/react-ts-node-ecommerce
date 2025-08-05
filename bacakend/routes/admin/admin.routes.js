/*===========*****===========imports===========*****===========*/
import express from "express"
import guest from "./guest.admins.routes.js";
import verified from "./verified.admins.routes.js";
import { Authenticated } from "../../middlewares/auth.middleware.js";
import * as profile from "../../controllers/admin/admin.profile.controller.js";
import { Verified } from "../../middlewares/verified.middleware.js";
import fileUpload from "express-fileupload";
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========guest-routes===========*****===========*/
router.use("/auth", guest);
/*===========*****===========guest-routes===========*****===========*/


/*===========*****===========profile===========*****===========*/
router.get("/protected/send-email", Authenticated("admin"), profile.sendmail);
/*===========*****===========profile===========*****===========*/

/*===========*****===========profile===========*****===========*/
router.get("/protected/verify-email", Authenticated("admin"), profile.verify);
/*===========*****===========profile===========*****===========*/

/*===========*****===========profile===========*****===========*/
router.put("/protected/update-profile", [Authenticated("admin"),fileUpload()], profile.update);
/*===========*****===========profile===========*****===========*/

/*===========*****===========protected-routes===========*****===========*/
router.use("/protected", [Authenticated("admin"), Verified], verified);
/*===========*****===========protected-routes===========*****===========*/


/*===========*****===========export===========*****===========*/
export default router;