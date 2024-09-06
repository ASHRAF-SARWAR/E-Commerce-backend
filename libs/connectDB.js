import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ashrafsarwar542:uztSmqLNL1FyXrA0@cluster0.9bbfs7m.mongodb.net/ecommerce"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error: ", error));
};

export default connectDB;
