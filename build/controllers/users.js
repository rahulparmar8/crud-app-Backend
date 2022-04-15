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
const express_validator_1 = require("express-validator");
const student_1 = __importDefault(require("../models/student"));
const session_1 = __importDefault(require("../models/session"));
const express_validation_1 = require("express-validation");
class Student {
    constructor() {
        // Get All Student Data //
        this.getData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            // console.log(result[0]);
            if (result[0]) {
                var success = false;
                var fail = false;
                return res.render("addstudent", {
                    bodyData: req.body,
                    success: success,
                    user: result[0],
                    fail: fail
                });
            }
            else {
                return res.redirect('/admin/login/');
            }
        });
        // Create Student Data //
        this.addStudentData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const schema = express_validation_1.Joi.object()
                .keys({
                name: express_validation_1.Joi.string()
                    .min(3)
                    .max(10)
                    .required(),
                email: express_validation_1.Joi.string()
                    .email()
                    .required(),
                age: express_validation_1.Joi.string()
                    .required(),
                fees: express_validation_1.Joi.number()
                    .integer()
                    .required(),
                number: express_validation_1.Joi.string().messages({
                    "string.base": `"number" should be a type of string`,
                    "integer.empty": `"number" must contain value`,
                    "string.pattern.base": `"number" must be 10 digit number`,
                    "any.required": `"number" is a required field`
                })
                    .min(10)
                    .max(10)
                    .required(),
            });
            try {
                const validation = schema.validate(req.body);
                const { name, email, age, fees, number } = req.body;
                const errors = (0, express_validator_1.validationResult)(req);
                if (validation.error) {
                    res.status(422)
                        .send((_a = validation.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
                }
                else {
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
            }
            catch (error) {
                console.log(error);
            }
        });
        // All Record List //
        this.viewAllRecord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            // console.log(result[0]);
            if (result[0]) {
                try {
                    const perPage = 5;
                    const page = req.params.page || 1;
                    let searchKeyword = req.query.search;
                    const result = yield student_1.default.find(searchKeyword ? { name: req.query.search } : {})
                        .skip(perPage * Number(page) - perPage)
                        .limit(perPage);
                    const count = yield student_1.default.count(searchKeyword ? { name: req.query.search } : {});
                    // console.log(req.query);
                    return res.render("list", {
                        data: result,
                        user: result[0],
                        current: page,
                        pages: Math.ceil(count / perPage),
                        dodyData: undefined,
                        search: searchKeyword
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                return res.redirect('/admin/login/');
            }
        });
        // Student Data Edit //
        this.editData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            try {
                const results = yield student_1.default.findById(req.params.id, req.body);
                // console.log(req.body);
                return res.render("edit", {
                    data: results,
                    user: result[0]
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        // Update Document //
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
                const result = yield student_1.default.findByIdAndDelete(req.params.id);
                return res.redirect("/admin/list/1");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Student;
