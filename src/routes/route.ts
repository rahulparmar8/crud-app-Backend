import express, { Router } from "express";
import Student from "../controllers/users";

const student = new Student();
const router = express.Router();


router.get('/add', student.getData)
router.post('/add', student.addStudentData)
router.get('/list', student.viewAllRecord)
router.put('/update/:id', student.editData)
router.delete('/delete/:id', student.deleteRecord)
export default router;