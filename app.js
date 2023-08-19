import orderRoutes from "./routes/orderroutes.js";
import express from "express";
import { config } from "dotenv";
import { Database } from "./data/Db.js";
import ProductRouter from "./routes/productroutes.js";
import cors from "cors"



config({
    path: "./data/info.env"
});
export const app = express();

import { ErrorsMiddleware } from "./middlewares/erorr.js";
import userRouter from "./routes/Userroutes.js";
import cookieParser from "cookie-parser";
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);




// Initialize Express app

// Connect to the database
Database();


app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', ProductRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRoutes);
app.use(ErrorsMiddleware);
