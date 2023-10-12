"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoDatabase_1 = require("./config/todoDatabase");
const mainApp_1 = require("./mainApp");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
const realPort = port;
(0, mainApp_1.mainApp)(app);
const Server = app.listen(realPort, () => {
    (0, todoDatabase_1.todoDatabase)();
    console.log("Server is listening on port", realPort);
});
process.on("uncaughtException", (error) => {
    console.log("");
    console.log("Server is shutting down due to an uncaught exception", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("");
    console.log("Server is shutting down due to an unhandled rejection", reason);
    Server.close(() => {
        process.exit(1);
    });
});
