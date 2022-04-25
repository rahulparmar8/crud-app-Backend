import express, { Router } from "express";
import Student from "../controllers/users";

const student = new Student();
const router = express.Router();

router.get('/add', student.getData);
router.post('/add', student.addStudentData);
router.get('/list/:page', student.viewAllRecord);
router.get('/edit/:id', student.editData);
router.post('/edit/:id', student.updateData);
router.get('/delete/:id', student.deleteRecord);


export default router;