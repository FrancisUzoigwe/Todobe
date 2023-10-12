"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/register").post(userController_1.registerUser);
router.route("/signin").post(userController_1.signinUser);
router.route("/view-all").get(userController_1.viewAllUser);
router.route("/:userID/view-one").get(userController_1.viewOne);
router.route("/:userID/delete").delete(userController_1.deleteUser);
router.route("/:userID/update").patch(userController_1.updateUser);
exports.default = router;
