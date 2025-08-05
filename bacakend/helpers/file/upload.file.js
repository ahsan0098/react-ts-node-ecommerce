/*===========*****===========imports===========*****===========*/
import Err from "../errors/custom.error.js";
import path from "path"
import fs from 'fs';
/*===========*****===========imports===========*****===========*/


/*===========*****===========upload file===========*****===========*/
const upload = async (file, mimes = [], max, folder = "") => {
    if (!file) {
        throw new Err('No file uploaded', 400);
    }

    const valid = mimes.some((mime) => {
        if (mime.endsWith('/*'))
            return file.mimetype.startsWith(mime.replace('/*', ''));

        return file.mimetype === mime;
    });

    if (mimes.length && !valid)
        throw new Err(`Invalid file type. Uploaded: ${file.mimetype}. Allowed: ${mimes.join(", ")}`, 400);


    if (file.size > max * 1024 * 1024)
        throw new Err(`File size exceeds limit. Max allowed is ${max}MB`, 400);

    const dir = path.join('public/uploads', folder);

    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });


    const fileExt = path.extname(file.name);
    const safeFileName = `${file.md5}${fileExt}`;
    const filePath = path.join(dir, safeFileName);

    await file.mv(filePath);

    return path.join('public/uploads', folder, safeFileName).replace(/\\/g, '/');
};
/*===========*****===========upload file===========*****===========*/


/*===========*****===========export===========*****===========*/
export default upload