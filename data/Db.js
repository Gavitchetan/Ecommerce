import mongoose from "mongoose";

// Handling unqute eror

export const Database = async () => {
    console.log('DB URI:', process.env.server);

    mongoose.connect(process.env.server, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to the database');
        })
}
