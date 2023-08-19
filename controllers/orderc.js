import ErrorHandler from "../middlewares/erorr.js";
import Orders from "../models/ordermode.js";


// import Product from "../models/productModel.js"; // Assuming you have a product model
import Product from "../models/productm.js";

export const newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const order = await Orders.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id
        });

        res.status(201).json({
            message: "Order placed successfully",
            success: true,
            order
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};


export const getSingleOrder = async (req, res, next) => {
    try {
        const order = await Orders.findById(req.params.id)
            .populate('user', 'name email')
        // populate will fetch data of the user who have a order it will get user id from order and find in on line code 


        if (!order) {
            return next(new ErrorHandler(200, "order not found"))
        }

        res.status(200).json({
            Message: "Your Order",
            success: true,
            order

        })
    } catch (error) {

    }
}
//getLoggedInOrder

export const myOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({ user: req.user._id })
        if (!orders) {
            return next(new ErrorHandler(200, "orders not found"))
        }

        res.status(200).json({
            Message: "Your Order",
            success: true,
            orders
        })
    } catch (error) {

    }
}



export const getAllOrder = async (req, res, next) => {
    try {
        const order = await Orders.find({})
        if (!order) {
            return next(new ErrorHandler(200, "order not found"))
        }
        let totalAmount = 0;
        order.forEach(order => {
            totalAmount += order.totalPrice;
        })
        res.status(200).json({
            Message: "Your Order",
            success: true,
            order

        })
    } catch (error) {

    }
}


// export const UpdateOrder = async (req, res, next) => {
//     const { _id } = req.params;
//     try {
//         const order = await Orders.findById(_id)
//         if (!order) {
//             return next(new ErrorHandler(200, "order not found"))
//         }
//         if (order.orderStatus === "Delivered") {
//             return next(new ErrorHandler(200, 'You have already delivered Order'))
//         }

//         order.orderItems.forEach(async (order) => {
//             await updateStock(orderProduct, order.qty)
//         })
//         order.orderStatus = req.body.status;

//         if (req.body.status == "Delivered") {
//             order.deliveredAt = Date.now()

//         }
//         await order.save({ validateBeforeSave: false })
//         res.status(200).json({
//             Message: "Your Order",
//             success: true,
//             order

//         })
//     } catch (error) {
//         next()
//     }
// }

// async function updateStock(_id, qty) {
//     const product = await Product.findById(_id);

//     product.Stock -= qty;
//     await product.save({ validateBeforeSave: true })
// }


// export const DeleteOrder = async (req, res, next) => {
//     try {
//         const { _id } = req.params;
//         const order = await Orders.find({ _id })
//         if (!order) {
//             return next(new ErrorHandler(200, "order not found"))
//         }
//         order.deleteOne()
//         await order.save({ validateBeforeSave: false })
//         res.status(200).json({
//             Message: "Your Order",
//             success: true,
//             order

//         })
//     } catch (error) {
//         next()
//     }
// }




// import ErrorHandler from './path-to-error-handler'; // Import your ErrorHandler module
// import Product from './path-to-product-model'; // Import your Product model
// import Orders from './path-to-orders-model'; // Import your Orders model

export const UpdateOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await Orders.findById({ _id: id });
        if (!order) {
            return next(new ErrorHandler(404, "Order not found"));
        }
        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler(400, 'Order is already delivered'));
        }

        for (const orderItem of order.orderItems) {
            await updateStock(orderItem.product, orderItem.qty);
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save();
        res.status(200).json({
            message: "Order updated successfully",
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (product) {
        product.Stock -= quantity;
        await product.save();
    }
}

export const DeleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Orders.findById({ _id: id });
        if (!order) {
            return next(new ErrorHandler(404, "Order not found"));
        }

        await order.deleteOne();
        res.status(200).json({
            message: "Order deleted successfully",
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};
