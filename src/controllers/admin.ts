import express, { Request, Response } from "express";
import userModel from "../models/users";
import SessionModel from "../models/session";
import { Joi } from 'express-validation';
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser';
import nodemailer from "nodemailer";

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

export default class Users {

    // Users GET Datat //
    getUser = async (req: Request, res: Response) => {
        const result = await SessionModel.find({ "key": "email" })
        return res.render("registration", {
            user: result[0],
        })
    }

    // Users Registration //
    registration = async (req: Request, res: Response) => {
        const schema = Joi.object()
            .keys({
                firstname: Joi.string()
                    .min(3)
                    .max(10)
                    .required(),
                lastname: Joi.string()
                    .min(3)
                    .max(10)
                    .required(),
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string()
                    .required(),
            })
        try {
            const usersValidation = schema.validate(req.body)
            const { firstname, lastname, email, password } = req.body
            if (usersValidation.error) {
                res.status(422)
                    .send(usersValidation.error?.details[0].message)
            }
            else {

                const salt = await bcryptjs.genSalt(10)
                const hashPassword = await bcryptjs.hash(password, salt)
                const user = new userModel({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hashPassword,
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    emailVerification: true
                })
                const result = await user.save();
                return res.redirect("/admin/login/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // GET USER LOGIN //
    loginUser = async (req: Request, res: Response) => {
        const result = await SessionModel.find({ "key": "email" })
        res.render("login", {
            user: result[0],
        })
    }

    // USER LOGIN POST //
    loginPost = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })
            // console.log(user);
            if (user) {
                const match = await bcryptjs.compare(password, user.password)
                if (match) {
                    // Create Token //
                    const token = this.createToken(user.id)

                    // Store token cookie //
                    res.cookie('access-token', token)
                    const session = new SessionModel({
                        key: "email",
                        value: email
                    })
                    const result = await session.save();
                    return res.redirect("/admin/add/")
                }
                else {
                    return res.send("Invalid Password ");
                }
            }
            if (user.password !== password) {
                return res.send("Invalid Email");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // USER LOGOUT //
    userLogout = async (req: Request, res: Response) => {
        const result = await SessionModel.find({ "key": "email" })
        try {
            const results = await SessionModel.deleteMany({})
            return res.redirect("/admin/login")
        } catch (error) {
        }
    }

    createToken = (id: any) => {
        return jwt.sign({ id }, 'bewhdswcvdfehjdcdfshj')
    }

}