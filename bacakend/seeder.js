/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose";
import seeds from "./seeds/index.js"
import dotenv from "dotenv";
/*===========*****===========imports===========*****===========*/

const start = async () => {
    try {
        dotenv.config();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('=======================Seeding=====================\n');

        await Promise.all(seeds.map(async (seed) => {
            console.log(`started seeding ${seed.name}........`);
            await seed.func();
            console.log(`${seed.name} seeded successfully\n`);
        }));

        console.log('=======================Complete=====================\n');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

start();
