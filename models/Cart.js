import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Please enter price"],
            maxlength: [8, 'Price cannot exceed 8 characters'],
        },
        url: {
            type: String,
            required: true,
        },
    },
    qty: {
        type: Number,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId type
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
