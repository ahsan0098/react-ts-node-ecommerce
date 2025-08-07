import Admin from "../models/admin.model.js";

const seeds = [
    {
        email: "ahsan@gmail.com",
        image: "",
        name: "Ahsan Ali",
        verified: false
    },
    {
        email: "alex@gmail.com",
        image: "",
        name: "Alex John",
        verified: false
    },


];

const adminsseeds = async () => {
    for (const seed of seeds) {

        await Admin.updateOne(
            { email: seed.email },
            { $set: seed },
            { upsert: true }
        );

    }
};

export default adminsseeds