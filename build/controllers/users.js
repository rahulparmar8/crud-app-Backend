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
            // const data = await StudentModel.find()
            //console.log(data);
            return res.render("addstudent");
        });
        // Create Student Data //
        this.addStudentData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            try {
                const { name, email, age, fees, number } = req.body;
                //console.log(req.body);
                const data = new student_1.default({
                    name: name,
                    email: email,
                    age: age,
                    fees: fees,
                    number: number,
                });
                const result = yield data.save();
                return res.redirect('/admin/add/');
            }
            catch (error) {
                console.log(error);
            }
        });
        // All record list //
        this.viewAllRecord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield student_1.default.find({});
                return res.render("list", {
                    data: result,
                    dodyData: undefined
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        // Student Data edit //
        this.editData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield student_1.default.findById(req.params.id, req.body);
                // console.log(req.body);
                return res.render("edit", {
                    data: result
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //Update document
        this.updateData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield student_1.default.findByIdAndUpdate(req.params.id, req.body);
                return res.redirect("/admin/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        // Delete tabel Record //
        this.deleteRecord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('i m here')
                const result = yield student_1.default.findByIdAndDelete(req.params.id);
                return res.redirect("/admin/list");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Student;
