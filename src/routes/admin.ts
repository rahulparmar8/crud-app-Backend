import express, { Router } from "express";
import Users from "../controllers/admin";

const users = new Users();
const router = express.Router();

router.get('/login', users.loginUser);
router.post('/login', users.loginPost);
router.get('/signup', users.getUser);
router.post('/signup', users.registration);
router.get('/logout', users.userLogout);

export default router;