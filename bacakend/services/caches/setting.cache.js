/*===========*****===========imports===========*****===========*/
import NodeCache from "node-cache";
import Setting from "../../models/setting.model.js";
/*===========*****===========imports===========*****===========*/

/*===========*****===========init===========*****===========*/
const cache = new NodeCache({ stdTTL: 3600 });
/*===========*****===========init===========*****===========*/


/*===========*****===========load or refresh===========*****===========*/
const loadSettings = async () => {
    const settings = await Setting.find();
    const data = {};

    settings.forEach(setting => {
        if (!data[setting.group]) data[setting.group] = {};
        
        data[setting.group][setting.key] = setting.value;
    });

    cache.set("settings", data);
    return data;
};
/*===========*****===========load or refresh===========*****===========*/


/*===========*****===========access===========*****===========*/
export const getSettings = async () => {
    let settings = cache.get("settings");
    if (!settings) {
        settings = await loadSettings();
    }
    return settings;
};
/*===========*****===========access===========*****===========*/