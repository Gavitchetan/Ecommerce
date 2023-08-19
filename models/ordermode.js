import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
    },
    orderItems: [{
        // Define order items schema
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        // Define paymentInfo schema
    },
    itemPrice: {
        type: Number,
        default: 0,
        required: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        required: true,
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Orders = mongoose.model("Order", orderSchema);

export default Orders;
