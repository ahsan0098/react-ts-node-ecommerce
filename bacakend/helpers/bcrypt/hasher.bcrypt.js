/*===========*****===========imports===========*****===========*/
import bcrypt from "bcryptjs";
/*===========*****===========imports===========*****===========*/


/*===========*****===========hash password===========*****===========*/
const hasher = async (pass) => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);

};
/*===========*****===========hash password===========*****===========*/


/*===========*****===========export===========*****===========*/
export default hasher