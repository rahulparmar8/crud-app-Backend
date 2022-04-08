"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const student = new users_1.default();
const router = express_1.default.Router();
router.get('/add', student.getData);
router.post('/add', student.addStudentData);
router.get('/list', student.viewAllRecord);
router.get('/edit/:id', student.editData);
router.post('/edit/:id', student.updateData);
router.get('/delete/:id', student.deleteRecord);
exports.default = router;
