import express, { Router } from "express";
import Student from "../controllers/users";

import { check } from "express-validator";
const student = new Student();

const router = express.Router();

router.get('/add', student.getData);
router.post('/add',
    check("name", "Name is required. Please enter your response.")
        .not()
        .isEmpty(),
    check("email", "Email is required. Please enter your response.")
        .not()
        .isEmpty(),
    check("age", "Age is required. Please enter your response.")
        .not()
        .isEmpty(),
    check("fees", "Fees is required. Please enter your response.")
        .not()
        .isEmpty(),
    check("number", "Number is required. Please enter your response.")
        .not()
        .isEmpty(),
    student.addStudentData);
router.get('/list/:page', student.viewAllRecord);
router.get('/edit/:id', student.editData);
router.post('/edit/:id', student.updateData);
router.get('/delete/:id', student.deleteRecord);


export default router;