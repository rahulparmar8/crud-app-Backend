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
const users_1 = __importDefault(require("../models/users"));
const express_validation_1 = require("express-validation");
class Users {
    constructor() {
        // Users GET Datat //
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.render("registration");
        });
        // Users Registration //
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const schema = express_validation_1.Joi.object()
                .keys({
                firstname: express_validation_1.Joi.string()
                    .min(3)
                    .max(10)
                    .required(),
                lastname: express_validation_1.Joi.string()
                    .min(3)
                    .max(10)
                    .required(),
                email: express_validation_1.Joi.string()
                    .email()
                    .required(),
                password: express_validation_1.Joi.string()
                    .required(),
            });
            try {
                const usersValidation = schema.validate(req.body);
                const { firstname, lastname, email, password } = req.body;
                if (usersValidation.error) {
                    res.status(422)
                        .send((_a = usersValidation.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
                }
                else {
                    const user = new users_1.default({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password
                    });
                    const result = yield user.save();
                    return res.redirect("/admin/login/");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        // Login //
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render("login");
        });
        this.loginPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield users_1.default.findOne({ email });
                console.log(user);
                if (!user) {
                    return res.send("Invalid Email");
                }
                if (user.password !== password) {
                    return res.send("Invalid Password");
                }
                req.session.email = req.param('email');
                return res.redirect("/admin/add/");
            }
            catch (error) {
            }
        });
    }
}
exports.default = Users;
