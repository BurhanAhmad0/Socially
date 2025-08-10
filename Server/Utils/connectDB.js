import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/socially`);
    if (conn) {
      console.log("Database connected successfully!");
    }
  } catch (error) {
    console.log("Error connecting database", error);
  }
};
