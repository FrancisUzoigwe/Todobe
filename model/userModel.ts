import mongoose from "mongoose";

interface iUser {
  email: string;
  userName: string;
  image: string;
  imageID: string;
  password: string;
  todos: {}[];
}

interface iUserData extends iUser, mongoose.Document {}

const iUserModel = new mongoose.Schema(
  {
    userName: { type: String },
    image: { type: String },
    imageID: { type: String },
    email: { type: String },
    password: { type: String },
    todos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "todos",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", iUserModel);
