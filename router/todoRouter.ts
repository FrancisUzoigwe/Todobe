import express from "express";
import { createTodo, readOne, viewAllTodo } from "../controller/todoController";
const router = express.Router();
router.route("/:userID/create").post(createTodo);
router.route("/all-todos").get(viewAllTodo);
router.route("/:userID/:todoID/view-one").get(readOne);

export default router;

