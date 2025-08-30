import mongoose from "mongoose";
import fs from 'fs';

const creds = JSON.parse(
  fs.readFileSync(new URL("../credentials.json", import.meta.url))
);

export const connectDB = async () => {
    await mongoose.connect(creds.mongodb)
    .then(() => console.log('DB CONNECTED'))
}