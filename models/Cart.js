// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel; 
