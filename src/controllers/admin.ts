import express, { Request, Response } from "express";
import userModel from "../models/users";
import { Joi } from 'express-validation';
export default class Users {

    // Users GET Datat //
    getUser = async (req: Request, res: Response) => {
        return res.render("registration")
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

    // Login //
    loginUser = async (req: Request, res: Response) => {
        res.render("login")
    }

    loginPost = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })
            console.log(user);
            if (!user) {
                return res.send("Invalid Email");
            }
            if (user.password !== password) {
                return res.send("Invalid Password");
            }
            req.session.email = req.param('email');
            return res.redirect("/admin/add/")
        } catch (error) {
        }
    }
}