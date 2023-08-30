import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"
export const upload = multer({ dest: 'uploads/' });
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: 568258725718419,
    api_secret: process.env.API_SECRET,
});