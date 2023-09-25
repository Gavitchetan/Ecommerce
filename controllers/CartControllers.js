import Cartmodel from "../models/Cart.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "../middlewares/erorr.js";
import CartModel from "../models/Cart.js";


export const AddTocart = async (req, res, next) => {
    try {
        const { productId, qty } = req.body

        const { token } = req.cookies

        const Decode = jwt.verify(token, process.env.Jwt_secret)
        console.log(Decode.id, 'decode')
        const { cart } = await Cartmodel.create({
            userId: Decode.id,
            productid: productId,
            qty: qty,
        })

        console.log(cart, 'cart')
        res.status(201).json({
            Message: "product is added to cart succesfully",
            cart
        })
    } catch (error) {

        console.log("eror")
        return next(new ErrorHandler(400, "Internal server Erorr"))
    }
}




export const GetMycart = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const id = req.params
        console.log(id)
        const Decode = jwt.verify(token, process.env.Jwt_secret);
        console.log(Decode.id, 'id')
        console.log(Decode)
        const Cart = await CartModel.find({ userId: Decode.id })
        res.status(200).json({
            Cart,
            Message: "hello world"
        })
    } catch (error) {

    }
}


export const FindAndUpdateCart = async (req, res, next) => {
    try {
        console.log('first')
        const { qty } = req.body
        const { id } = req.params
        console.log(id, 'id is not undefind')

        const cart = await CartModel.findByIdAndUpdate(id, { qty }, { new: true, runValidators: true })

        res.status(200).json({
            cart: cart,
            Message: "hello world"
        })

        console.log(cart)

    } catch (error) {

        console.log("eror")
        return next(new ErrorHandler(400, "Internal server Erorr"))
    }
}

export const Mycart = async (req, res, next) => {
    try {
        const { id } = req.params
        const Cart = await CartModel.findOne({ _id: id })

        console.log(Cart)
        res.status(200).json({
            cart: Cart
        })
    } catch (error) {
        console.log("Internal server Error")
        next(new ErrorHandler(400, "Internal Server Error"))
    }
}


export const DeletCartProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Assuming CartModel is a Mongoose model with findByIdAndDelete method
        const deletedCartProduct = await CartModel.findByIdAndDelete(id);

        if (!deletedCartProduct) {
            // If the product was not found, return a 404 status
            return res.status(404).json({ message: 'Cart product not found' });
        }

        // If the product was successfully deleted, return a 204 status (No Content)
        res.status(204).send();
    } catch (error) {
        console.error("Internal Server Error:", error);
        // Pass the error to the error-handling middleware
        next(error);
    }
};