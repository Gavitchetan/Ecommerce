import { app } from "./app.js";
import { Database } from "./data/Db.js";
const port = process.env.PORT;
import cloudinary from 'cloudinary'
const server = app.listen(port, () => {
    console.log(`app is working on ${port} port`)
})


Database();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.API_SECRET

})

process.on("uncaughtException", (err) => {
    console.log(`Erro:${err.message}`)
    console.log('shuting down the serve due to uncaughexation ')
    process.exit(1)
})
// console.log(youtube)
// Unhadled Promise Regection




process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`shuting down the server due to unhadled promise Rejection`)
    server.close(() => {
        process.exit(1)
    })
})