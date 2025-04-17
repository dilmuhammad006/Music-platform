import mongoose from "mongoose";
import dotenvConfig from "./dotenv.config.js";

const connectDb = async () => {
  try {
    await mongoose.connect(dotenvConfig.MONGO_URL);
    return `✅`;
  } catch (error) {
    console.log(error.message);
    throw new Error(`❌`);
  }
};

export default connectDb