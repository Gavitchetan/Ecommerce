import { ErrorsMiddleware } from "./middlewares/erorr.js";
import userRouter from "./routes/Userroutes.js";
import orderRoutes from "./routes/orderroutes.js";
import ProductRouter from "./routes/productroutes.js";
import CartRouter from "./routes/Cartroutes.js"
// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config({
    path: "./data/info.env",
});

export const app = express();


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your frontend's URL
//     credentials: true, // Enable credentials (cookies)E
// };


const corsOptions = {
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/v1', ProductRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', CartRouter);
app.use(ErrorsMiddleware);


// Error handling middleware
app.use(ErrorsMiddleware);

