"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controllers/admin"));
const users = new admin_1.default();
const router = express_1.default.Router();
router.get('/login', users.loginUser);
router.get('/signup', users.getUser);
router.post('/signup', users.registration);
router.post('/login', users.loginPost);
router.get('/logout', users.userLogout);
exports.default = router;
