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
const student_1 = __importDefault(require("../models/student"));
class Student {
    constructor() {
        // Get All Student Data //
        this.getData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield student_1.default.find();
            // const arr = {
            //   "data":data,
            //   "bodyData":req.body
            // }
            console.log(data);
            return res.send(data);
        });
        // Create Student Data //
        this.addStudentData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, age, fees, number } = req.body;
            console.log(req.body);
            // if (!name || !email || !age || !fees || !number) {
            //   return res.status(422).json({ erroe: "Field The Properly" })
            // }
            try {
                // const userExist = await StudentModel.findOne({ email: email })
                // if (userExist) {
                //   return res.status(400).json({ error: "Email already exist" })
                // }
                const user = new student_1.default({ name, email, age, fees, number });
                yield user.save();
                return res.status(201).json({ message: "Successfully Saved :)" });
            }
            catch (error) {
                console.log(error);
            }
        });
        // All record list //
        this.viewAllRecord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
            }
        });
        // Student Data edit //
        this.editData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield student_1.default.findByIdAndUpdate(req.params.id, req.body);
                console.log(req.body);
                return res.status(200).json({ message: "Data Update" });
            }
            catch (error) {
                console.log(error);
            }
        });
        // Delete tabel Record //
        this.deleteRecord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield student_1.default.findByIdAndDelete(req.params.id);
                return res.status(200).json({ message: "Data Deleted", code: 200 });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Student;
