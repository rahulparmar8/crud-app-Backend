import express, { Request, Response } from "express";
import userModel from "../models/users";
import SessionModel from "../models/session";
import { Joi } from 'express-validation';
// import bcrypt from "bcrypt"

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
                const user = new userModel({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
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

    // USER LOGIN //
    loginPost = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })
            // console.log(req.session.;
            if (!user) {
                return res.send("Invalid Email");
            }
            if (user.password !== password) {
                return res.send("Invalid Password");
            }
            const session = new SessionModel({
                key: "email",
                value: email
            })
            const result = await session.save();
            return res.redirect("/admin/add/")
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
}