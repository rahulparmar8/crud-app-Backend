"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schema
const studentSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String },
    age: { type: String },
    fees: { type: Number },
    number: { type: Number },
});
// Model
const StudentModel = mongoose_1.default.model("student", studentSchema);
exports.default = StudentModel;
