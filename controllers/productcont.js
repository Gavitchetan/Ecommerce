import ErrorHandler from "../middlewares/erorr.js"
import Product from "../models/productm.js"
import Apifeacherswithwihtserchfilter from '../utils/apifeacher.js'
export const createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product,
        })
    } catch (error) {
        next(error)
    }
}
// export const getAllproduct = async (req, res, next) => {
//     try {
//         //  Api filter for serch make send PRoduct.find as query and req.qery (users query) then add .Function() 
//         // where  serhc option  add class name of who is parent of all the filter function then query like Apifiterc.query ;
//         const resultPerPage = 7;
//         const Apifecher = new Apifeacherswithwihtserchfilter(Product.find(), req.query)
//             .Searches()
//             .filter().
//             pagination(resultPerPage);
//         // console.log(Apifecher.query)
//         Apifecher.pagination(resultPerPage)
//         const products = await Apifecher.query;
//         const productCount = await Product.countDocuments()
//         if (products.length === 0) {
//             return next(new ErrorHandler(404, 'Products not found'));
//         }

//         res.status(200).json({
//             message: "Here are all the products",
//             // lent: products.length,
//             productCount,
//             products,
//             resultPerPage
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const getAllproduct = async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
};

export const UpdateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        let product = await Product.findById(id)

        if (!product) {
            return next(new ErrorHandler(404, 'product not found'))
        }
        product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useBigInt64: false })
        res.status(200).json({
            Message: "updated succesfully ",
            product
        })

    } catch (error) {
        next(error)
    }
}


export const DleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        if (!product) {
            return next(new ErrorHandler(404, 'product not found'))
        }
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: "product deleted"
        })
    } catch (error) {
        next(error)
    }
}



export const getSingleProductdetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler(404, 'Product not found'));
        }

        res.status(200).json({
            message: "Product details",
            product
        });
    } catch (error) {
        next(error)
    }
};


export const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        }
        console.log('trys')
        const product = await Product.findById(productId);
        const isReview = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
        if (isReview) {
            // check first old review and new review have same user if usr not same return 
            if ((rev) => rev.user.toString() === req.user._id.toString())
                product.reviews.forEach(rev => {
                    rev.rating
                })
            // product.numOfReviews = product.reviews.length

        }
        else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        console.log('trye')
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating;

        })
        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false })
        res.status(201).json({
            Message: "Review Is Added to product",
            success: true
        })
    } catch (error) {
        next()
    }
}


// to view all the review of  the single product 


export const Getallreviews = async (req, res, next) => {
    console.log("hello workd")
    try {
        const productId = req.query._id;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler(404, 'Product not found in database'))
        }
        res.status(200).json({
            success: true,
            review: product.reviews,

        })

    } catch (error) {
        next()
    }
}

// import ErrorHandler from 'your-error-handler-module'; // Import your error handler module
// import Product from 'your-product-model'; // Import your product mohttp://localhost:2000/api/v1/product/review?_id=64db8d0857257abd74d041c5&_product=64dba44ae2721c05f1f6bf9edel

export const deleteReviews = async (req, res, next) => {
    try {
        console.log("delete reive section in working")
        const { _id, _product } = req.query; // Updated variable name: _product instead of _product
        const product = await Product.findById(_product); // Updated variable name: _product
        if (!product) {
            return next(new ErrorHandler(404, 'Product not found in database'));
        }

        const reviewIdToDelete = _id; // Use the provided _id to identify the review to delete
        product.reviews = product.reviews.filter(rev => rev.id.toString() !== reviewIdToDelete.toString());

        let totalRating = 0; // Initialize totalRating
        product.reviews.forEach((rev) => {
            totalRating += rev.rating; // Accumulate ratings
        });

        product.ratings = totalRating / product.reviews.length; // Calculate average ratings

        product.numOfReviews = product.reviews.length; // Update the number of reviews

        await product.save(); // Save the changes to the product

        res.status(200).json({
            success: true,
            reviews: product.reviews, // Return updated reviews array
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};
