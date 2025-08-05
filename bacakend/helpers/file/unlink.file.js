/*===========*****===========imports===========*****===========*/
import fs from "fs"
/*===========*****===========imports===========*****===========*/


/*===========*****===========imports===========*****===========*/
const unlink = (path) => {
    try {
        fs.unlinkSync(path);
        console.log("File deleted:", path);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn("File does not exist:", path);
        } else {
            console.error("Error deleting file:", err);
        }
    }
};
/*===========*****===========imports===========*****===========*/


/*===========*****===========imports===========*****===========*/
export default unlink