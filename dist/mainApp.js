"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }));
    app.get("/", (req, res) => {
        return res.status(200).json({
            message: "You're using Kossyrisochukwu Francis Uzoigwe API's",
        });
    });
    app.use("/api", userRouter_1.default);
    app.use("/api", todoRouter_1.default);
};
exports.mainApp = mainApp;
