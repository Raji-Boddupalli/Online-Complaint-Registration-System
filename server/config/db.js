import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectToDB;