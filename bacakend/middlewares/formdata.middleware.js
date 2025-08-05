/*===========*****===========imports===========*****===========*/
import express from "express"
import fileUpload from "express-fileupload";
/*===========*****===========imports===========*****===========*/


/*===========*****===========multipart===========*****===========*/
const formdata = (req, res, next) => {
    const router = express.Router();

    router.use(fileUpload);
}
/*===========*****===========multipart===========*****===========*/


/*===========*****===========export===========*****===========*/
export default formdata;