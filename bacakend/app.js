import dotenv from "dotenv";
dotenv.config();
/*===========*****===========imports===========*****===========*/
import express from "express"
import routes from "./routes/index.js"
import mongoose from "mongoose";
import JsonErrors from "./middlewares/errors.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
/*===========*****===========imports===========*****===========*/


/*===========*****===========initializes===========*****===========*/
const app = express();
app.use(express.json());
app.use(cookieParser());
/*===========*****===========initializes===========*****===========*/


/*===========*****===========cors policy===========*****===========*/
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
/*===========*****===========cors policy===========*****===========*/


/*===========*****===========static assets===========*****===========*/
app.use('/public', express.static('public'));
/*===========*****===========static assets===========*****===========*/


/*===========*****===========routes===========*****===========*/
app.get("/", (req, res) => res.json({ message: "welcome... Please use api version endpoint like 'api/v1' :)" }));
app.use("/api/v1", routes);
/*===========*****===========routes===========*****===========*/

/*===========*****===========404===========*****===========*/
app.use((req, res) => res.status(404).send("Route does not exist"));
/*===========*****===========404===========*****===========*/


/*===========*****===========routes===========*****===========*/
app.use(JsonErrors);
/*===========*****===========routes===========*****===========*/


/*===========*****===========build the server===========*****===========*/
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};


/*===========*****===========start the server===========*****===========*/
start();
