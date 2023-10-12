import mongoose from "mongoose";

interface iTodo {
  title: string;
  description: string;
  users: {};
}

interface iTodoData extends iTodo, mongoose.Document {}

const iTodoModel = new mongoose.Schema(
  {
    description: { type: String },
    title: { type: String },
    users: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTodoData>("todos", iTodoModel);
