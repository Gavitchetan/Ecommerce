import express from "express";
import { isAuthenticated, autheriseRole } from "../middlewares/auth.js";
import {
    getAllproduct,
    createProduct,
    UpdateProduct,
    DleteProduct,
    getSingleProductdetails,
    createProductReview,
    deleteReviews,
    Getallreviews,
} from "../controllers/productcont.js";

const router = express.Router();

// Properly structured routes with placeholders

router.get('/products', getAllproduct);
router.post('/admin/products/new', isAuthenticated, autheriseRole('admin'), createProduct);
router.put('/product/review', isAuthenticated, createProductReview);
router.get('/product/reviews', Getallreviews);
router.delete('/product/review/', isAuthenticated, deleteReviews);
router.delete('/admin/products/:id', isAuthenticated, autheriseRole('admin'), DleteProduct);
router.put('/admin/products/:id', isAuthenticated, autheriseRole('admin'), UpdateProduct);
router.get('/product/:id', getSingleProductdetails);

export default router;


// http://localhost:2000/api/v1/product/reviews