/*===========*****===========imports===========*****===========*/
import express from "express"
import * as reviews from "../../controllers/buyer/buyer.reviews.controller.js"
import * as wishlists from "../../controllers/buyer/buyer.wishlists.controller.js"
import * as addresses from "../../controllers/buyer/buyer.addresses.controller.js"
/*===========*****===========imports===========*****===========*/


/*===========*****===========init===========*****===========*/
const router = express.Router();
/*===========*****===========init===========*****===========*/


/*===========*****===========reviews routes===========*****===========*/
router.post("/reviews/create", reviews.create);

router.delete("/reviews/:_id/delete", reviews.remove);
/*===========*****===========reviews routes===========*****===========*/


/*===========*****===========wishlists routes===========*****===========*/
router.get("/wishlists", wishlists.all);

router.post("/wishlists/create", wishlists.add);

router.delete("/wishlists/:_id/delete", wishlists.remove);
/*===========*****===========wishlists routes===========*****===========*/


/*===========*****===========addresses routes===========*****===========*/
router.get("/addresses", addresses.all);

router.post("/addresses/create", addresses.add);

router.delete("/addresses/:_id/delete", addresses.remove);
/*===========*****===========addresses routes===========*****===========*/


/*===========*****===========export routes===========*****===========*/
export default router;