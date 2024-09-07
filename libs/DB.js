import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error: ", error));
};

export default connectDB;
