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
exports.updateUser = exports.deleteUser = exports.viewOne = exports.viewAllUser = exports.signinUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            email,
            password: hashed,
            userName,
        });
        return res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while creating user",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.registerUser = registerUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const checked = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checked) {
                return res.status(200).json({
                    message: "You're successfully logged in",
                    data: user === null || user === void 0 ? void 0 : user._id,
                });
            }
            else {
                return res.status(400).json({
                    message: "Password doesn't match",
                });
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while creating user",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.signinUser = signinUser;
const viewAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        return res.status(200).json({
            message: "Viewing all user ",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while viewing users",
        });
    }
});
exports.viewAllUser = viewAllUser;
const viewOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "todos",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        ;
        return res.status(200).json({
            message: "Viewing one user",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while viewing one user",
        });
    }
});
exports.viewOne = viewOne;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "User deleted successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while deleting one user",
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndUpdate(userID);
        return res.status(200).json({
            message: "User updated sucessfully",
            data: "This is: ",
            user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while updating user",
        });
    }
});
exports.updateUser = updateUser;
