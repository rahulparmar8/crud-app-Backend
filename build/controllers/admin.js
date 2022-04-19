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
const session_1 = __importDefault(require("../models/session"));
const express_validation_1 = require("express-validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mail Sender details //
// var smtpTransport = nodemailer.createTransport("SMTP", {
//     service: "Gmail",
//     auth: {
//         user: "rahu.p@peerbits.com",
//         pass: "WordOnly16"
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
class Users {
    constructor() {
        // Users GET Datat //
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            return res.render("registration", {
                user: result[0],
            });
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
                    const salt = yield bcryptjs_1.default.genSalt(10);
                    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
                    const user = new users_1.default({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hashPassword,
                        emailToken: crypto_1.default.randomBytes(64).toString('hex'),
                        emailVerification: true
                    });
                    const result = yield user.save();
                    return res.redirect("/admin/login/");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        // GET USER LOGIN //
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            res.render("login", {
                user: result[0],
            });
        });
        // USER LOGIN POST //
        this.loginPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield users_1.default.findOne({ email });
                // console.log(user);
                if (user) {
                    const match = yield bcryptjs_1.default.compare(password, user.password);
                    if (match) {
                        // Create Token //
                        const token = this.createToken(user.id);
                        // Store token cookie //
                        res.cookie('access-token', token);
                        const session = new session_1.default({
                            key: "email",
                            value: email
                        });
                        const result = yield session.save();
                        return res.redirect("/admin/add/");
                    }
                    else {
                        return res.send("Invalid Password ");
                    }
                }
                if (user.password !== password) {
                    return res.send("Invalid Email");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        // USER LOGOUT //
        this.userLogout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield session_1.default.find({ "key": "email" });
            try {
                const results = yield session_1.default.deleteMany({});
                return res.redirect("/admin/login");
            }
            catch (error) {
            }
        });
        this.createToken = (id) => {
            return jsonwebtoken_1.default.sign({ id }, 'bewhdswcvdfehjdcdfshj');
        };
    }
}
exports.default = Users;
