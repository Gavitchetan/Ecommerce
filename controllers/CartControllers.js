import Cartmodel from "../models/Cart.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "../middlewares/erorr.js";
import CartModel from "../models/Cart.js";
import Product from "../models/productm.js";


export const AddTocart = async (req, res, next) => {
    try {
        const { productId, qty } = req.body;
        const { token } = req.cookies;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const decoded = jwt.verify(token, process.env.Jwt_secret);
        const IsUser = await CartModel.find({ userId: decoded.id })

        // Product is not in the cart, add a new item
        const imageUrl = product.Image.length > 0 ? product.Image[0].url : '';
        const cartItem = new CartModel({
            userId: decoded.id,
            qty: qty,
            productId: product._id,
            product: {
                name: product.name,
                price: product.price,
                url: imageUrl,
            }
        });
        await cartItem.save();

        return res.status(201).json({
            message: 'Product added to cart successfully',
            cartItem
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



// get all task of a user according theier id 
export const GetMycart = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const Decode = jwt.verify(token, process.env.Jwt_secret);

        const Cart = await CartModel.find({ userId: Decode.id })
        const Products = Product.find()
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


// Single cart fetch using id
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

// Deltee cart items from Database
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