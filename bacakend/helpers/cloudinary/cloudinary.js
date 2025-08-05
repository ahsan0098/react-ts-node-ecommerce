/*===========*****===========imports===========*****===========*/
import {v2 as cloudinary} from "cloudinary";
import { config } from "dotenv";
/*===========*****===========imports===========*****===========*/

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_ENV,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/*===========*****===========exported===========*****===========*/
export default cloudinary;