"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.route("/:userID/create").post(todoController_1.createTodo);
router.route("/all-todos").get(todoController_1.viewAllTodo);
router.route("/:userID/:todoID/view-one").get(todoController_1.readOne);
exports.default = router;
