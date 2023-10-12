import express, { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      password: hashed,
      userName,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while creating user",
      error: error?.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checked = await bcrypt.compare(password, user?.password!);
      if (checked) {
        return res.status(200).json({
          message: "You're successfully logged in",
          data: user?._id,
        });
      } else {
        return res.status(400).json({
          message: "Password doesn't match",
        });
      }
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while creating user",
      error: error?.message,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      message: "Viewing all user ",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while viewing users",
    });
  }
};

export const viewOne = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    return res.status(200).json({
      message: "Viewing one user",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while viewing one user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while deleting one user",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndUpdate(userID);
    return res.status(200).json({
      message: "User updated sucessfully",
      data: "This is: ",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while updating user",
    });
  }
};
