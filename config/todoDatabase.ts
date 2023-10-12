import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const todoDatabase = async () => {
  await mongoose.connect(process.env.DB!).then(() => {
    console.log("DataBase connected");
  });
};
