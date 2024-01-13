import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
      {
        writeConcern: { w: "majority" },
      }
    );
    console.log(connection);
  } catch (error) {
    console.log("hi", error);
    process.exit(1);
  }
};

export default connectDB;
