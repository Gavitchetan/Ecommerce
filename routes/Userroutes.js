import express from 'express';
import { Alluser, resetPassword, ForgotPasswrod, GetmYprofile, Loginuser, Logout, newuSer, UpdateUserpasswrod, UpdateProfile, GetallUser, GetOneuser, UpdateUserRole, deleteUser } from '../controllers/usercontroler.js';
import { autheriseRole, isAuthenticated } from '../middlewares/auth.js';
import { upload } from '../utils/imgupload.js';
// import { resetPassword } from '../models/Usermode.js';
const router = express.Router();

router.route('/user/new').post(newuSer)
router.post('/user/new', upload.single('avatar'), newuSer)
router.route('/user/login').post(Loginuser)
router.route('/user/logout').get(isAuthenticated, Logout)
router.route('/user/me').get(isAuthenticated, GetmYprofile)
router.route('/user/password/forgot').post(ForgotPasswrod)
router.route('/user/password/reset/:token').put(resetPassword)
router.route('/user/all').get(isAuthenticated, Alluser)
router.route('/user/upassword').put(isAuthenticated, UpdateUserpasswrod)
router.route('/user/updateme').put(isAuthenticated, UpdateProfile)
// router.get("/admin/user/alluser", isAuthenticated, autheriseRole('admin'), GetallUser)
// Assuming 'router' is an instance of Express Router

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