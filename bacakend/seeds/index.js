import adminsseeds from "./admins.seed.js";
import settingseeds from "./setting.seed.js";

const seeds = [
    {
        "name": "settings",
        "func": settingseeds
    },
    {
        "name": "admins",
        "func": adminsseeds
    }
];

export default seeds;
