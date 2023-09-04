import express from 'express';
import { Alluser, resetPassword, ForgotPasswrod, GetmYprofile, Loginuser, Logout, UpdateUserpasswrod, UpdateProfile, GetallUser, GetOneuser, UpdateUserRole, deleteUser, Register } from '../controllers/usercontroler.js';
import { autheriseRole, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


// const upload = multer({ dest: "uploads/" });
router.post("/user/new", upload.single("avatar"), Register);



router.route('/user/login').post(Loginuser)
router.route('/user/logout').get(isAuthenticated, Logout)
router.route('/user/me').get(isAuthenticated, GetmYprofile)
router.route('/user/password/forgot').post(ForgotPasswrod)
router.route('/user/password/reset/:token').put(resetPassword)
router.route('/user/all').get(isAuthenticated, Alluser)
router.route('/user/upassword').put(isAuthenticated, UpdateUserpasswrod)
router.route('/user/updateme').put(isAuthenticated, UpdateProfile)
router.get(
    "/admin/users",
    isAuthenticated,         // Middleware to check if the user is authenticated
    autheriseRole('admin'),  // Middleware to check if the user has the 'admin' role
    GetallUser               // Handler function to retrieve all users
);


router.get(
    "/admin/user/details/:id",
    isAuthenticated,         // Middleware to check if the user is authenticated
    autheriseRole('admin'),  // Middleware to check if the user has the 'admin' role
    GetOneuser              // Handler function to retrieve all users
);
router.put(
    "/admin/user/:id",
    isAuthenticated,         // Middleware to check if the user is authenticated
    autheriseRole('admin'),  // Middleware to check if the user has the 'admin' role
    UpdateUserRole              // Handler function to retrieve all users
);
router.delete(
    "/admin/user/:id",
    isAuthenticated,         // Middleware to check if the user is authenticated
    autheriseRole('admin'),  // Middleware to check if the user has the 'admin' role
    deleteUser              // Handler function to retrieve all users
);
export default router