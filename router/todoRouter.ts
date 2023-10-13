import express from "express";
import {
  createTodo,
  deleteOne,
  readOne,
  viewAllTodo,
} from "../controller/todoController";
const router = express.Router();
router.route("/:userID/create").post(createTodo);
router.route("/all-todos").get(viewAllTodo);
router.route("/:userId/view-one-todo").get(readOne);
router.route("/:todoID/delete").delete(deleteOne);

export default router;
