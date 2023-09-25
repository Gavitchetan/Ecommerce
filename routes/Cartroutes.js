import express from "express";
import { FindAndUpdateCart, AddTocart, GetMycart, DeletCartProduct, Mycart } from "../controllers/CartControllers.js"
import { isAuthenticated } from "../middlewares/auth.js";
const app = express.Router();

app.post('/cart/new', isAuthenticated, AddTocart);
app.get('/cart', isAuthenticated, GetMycart);
app.get('/cart/:id', isAuthenticated, Mycart);
app.delete('/cart/:id', isAuthenticated, DeletCartProduct);
app.put('/cart/:id', isAuthenticated, FindAndUpdateCart);


export default app