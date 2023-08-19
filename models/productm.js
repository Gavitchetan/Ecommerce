import mongoose from "mongoose";

const ProductShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trinm: true
    },
    description: {
        type: String,
        required: [true, "Please enter product  description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLenght: [8, 'price connot excedd 8 carector']
    },
    ratings: {
        type: Number,
        default: 0
    },
    Image: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "plese enter product Category"],
    },
    Stock: {
        type: Number,
        required: true,
        maxLenght: [4, 'please enter stock'],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,

    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                require: true,
            },

        }
    ],
    createAt: {
        type: Date,
        default: Date.now

    }
    , user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Product = mongoose.model('Product', ProductShema)

export default Product