import { Request, Response } from "express";
import todoModel from "../model/todoModel";
import userModel from "../model/userModel";
import mongoose from "mongoose";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    if (user) {
      const { title, description } = req.body;
      const todo = await todoModel.create({
        title,
        description,
        users: user?._id,
      });
      user?.todos.push(new mongoose.Types.ObjectId(todo?._id));
      user?.save();
      return res.status(201).json({
        message: "Todo created successfully",
        data: todo,
      });
    } else {
      return res.status(404).json({
        message: "User not found, please sign up",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `Error occured while creating todo ${error.message}`,
      error,
    });
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

      const tasked = await todoModel.findById(userID).populate({
        path: "users",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      });
      return res.status(200).json({
        message: "Reading one task ",
        data: tasked,
      });

  } catch (error: any) {
    return res.status(400).json({
      message: `Error occured while reading one todo${error.message}`,
      error
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;
    const tasked = await todoModel.findByIdAndDelete(todoID);
    return res.status(200).json({
      message: "Task deleted successfully ",
      data: tasked,
    });
  } catch (error) {
    return res.status(400).json({
      messae: "Error occured while deleting task",
    });
  }
};

export const viewAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.find();
    return res.status(200).json({
      message: "Viewing all todos",
      data: todos,
    });
  } catch (error) {
    return res.status(400).json({
      messae: "Error viewing all todo's ",
    });
  }
};
