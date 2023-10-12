"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const iUserModel = new mongoose_1.default.Schema({
    userName: { type: String },
    image: { type: String },
    imageID: { type: String },
    email: { type: String },
    password: { type: String },
    todos: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "todos",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", iUserModel);
