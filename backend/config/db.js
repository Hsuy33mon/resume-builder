import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://thuyein1996alpha_db_user:resume123@cluster0.nkkccez.mongodb.net/RESUME')
    .then(() => console.log('DB CONNECTED'))
}