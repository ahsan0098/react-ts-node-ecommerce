const config = {
    // for now configs are static...so use env..but latter add redis 
    sitename: process.env.HOST_NAME,
    siteemail: process.env.HOST_EMAIL,
};

export default config;