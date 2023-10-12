import express from "express";
import {
  deleteUser,
  registerUser,
  signinUser,
  updateUser,
  viewAllUser,
  viewOne,
} from "../controller/userController";

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/signin").post(signinUser);
router.route("/view-all").get(viewAllUser);
router.route("/:userID/view-one").get(viewOne);
router.route("/:userID/delete").delete(deleteUser);
router.route("/:userID/update").patch(updateUser);
export default router;
