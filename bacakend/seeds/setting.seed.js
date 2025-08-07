import Setting from "../models/setting.model.js";

const seeds = [
    {
        key: "name",
        value: "ECommerce",
        group: "general",
        field: "input",
        attrs: { "type": "text", placeholder: "Enter website official name" }
    },
    {
        key: "email",
        value: "info@ecom.org",
        group: "general",
        field: "input",
        attrs: { "type": "email", placeholder: "Enter website official email" }
    },

    {
        key: "phone",
        value: "info@ecom.org",
        group: "general",
        field: "input",
        attrs: { "type": "text", placeholder: "Enter website official phone number" }
    },
    {
        key: "currency",
        value: "USD",
        group: "business",
        field: "input",
        attrs: { "type": "text", placeholder: "Enter website default currency" }

    },

    {
        key: "pagination",
        value: 10,
        group: "general",
        field: "input",
        attrs: { "type": "numeric", placeholder: "Enter per page item limit" }

    },
];

const settingseeds = async () => {
    for (const seed of seeds) {

        await Setting.updateOne(
            { key: seed.key },
            { $set: seed },
            { upsert: true }
        );

    }
};

export default settingseeds