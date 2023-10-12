import cors from "cors";
import express, { Application, Request, Response } from "express";
import user from "./router/userRouter";
import todo from "./router/todoRouter";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "You're using Kossyrisochukwu Francis Uzoigwe API's",
    });
  });
  app.use("/api", user);
  app.use("/api", todo);
};
