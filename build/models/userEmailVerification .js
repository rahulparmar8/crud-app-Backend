"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userEmailVerification = new mongoose_1.default.Schema({
    userId: { type: String },
    value: { type: String }
});
// Model
const EmailVerification = mongoose_1.default.model("userEmailVerification", userEmailVerification);
exports.default = EmailVerification;
