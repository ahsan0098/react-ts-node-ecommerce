/*===========*****===========imports===========*****===========*/
import bcrypt from "bcryptjs";
/*===========*****===========imports===========*****===========*/


/*===========*****===========verify password===========*****===========*/
const verifier = async (candidate, current) => {
    return await bcrypt.compare(candidate, current)
}
/*===========*****===========verify password===========*****===========*/


/*===========*****===========export===========*****===========*/
export default verifier