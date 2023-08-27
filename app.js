import orderRoutes from "./routes/orderroutes.js";
import express from "express";
import { config } from "dotenv";
import { Database } from "./data/Db.js";
import ProductRouter from "./routes/productroutes.js";
import cors from "cors"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload";
config({
    path: "./data/info.env"
});
export const app = express();
app.use(cors())
import { ErrorsMiddleware } from "./middlewares/erorr.js";
import userRouter from "./routes/Userroutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Connect to the database

app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', ProductRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRoutes);
app.use(ErrorsMiddleware);
