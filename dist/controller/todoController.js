"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllTodo = exports.deleteOne = exports.readOne = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const { title, description } = req.body;
            const todo = yield todoModel_1.default.create({ title, description, users: user === null || user === void 0 ? void 0 : user._id });
            user === null || user === void 0 ? void 0 : user.todos.push(new mongoose_1.default.Types.ObjectId(todo === null || todo === void 0 ? void 0 : todo._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "Todo created successfully",
                data: todo,
            });
        }
        else {
            return res.status(404).json({
                message: "User not found, please sign up",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `Error occured while creating todo ${error.message}`,
            error
        });
    }
});
exports.createTodo = createTodo;
const readOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoID } = req.params;
        const tasked = yield todoModel_1.default.findById(todoID).populate({
            path: "todos",
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
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while reading one todo",
        });
    }
});
exports.readOne = readOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoID } = req.params;
        const tasked = yield todoModel_1.default.findByIdAndDelete(todoID);
        return res.status(200).json({
            message: "Task deleted successfully ",
            data: tasked,
        });
    }
    catch (error) {
        return res.status(400).json({
            messae: "Error occured while deleting task",
        });
    }
});
exports.deleteOne = deleteOne;
const viewAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find();
        return res.status(200).json({
            message: "Viewing all todos",
            data: todos,
        });
    }
    catch (error) {
        return res.status(400).json({
            messae: "Error viewing all todo's ",
        });
    }
});
exports.viewAllTodo = viewAllTodo;
