import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import StudentModel from '../models/student'
import SessionModel from "../models/session";
import { Joi } from 'express-validation';
import bcrypt from "bcrypt";
import crypto from 'crypto';
import nodemailer from "nodemailer";

export default class Student {

  // Get All Student Data //
  getData = async (req: Request, res: Response) => {
    const result = await SessionModel.find({ "key": "email" })
    // console.log(result[0]);
    if (result[0]) {
      var success = false;
      var fail = false;
      return res.render("addstudent", {
        bodyData: req.body,
        success: success,
        user: result[0],
        fail: fail
      })
    } else {
      return res.redirect('/admin/login/')
    }
  }

  // Create Student Data //

  addStudentData = async (req: Request, res: Response) => {
    const schema = Joi.object()
      .keys({
        name: Joi.string()
          .min(3)
          .max(10)
          .required(),
        email: Joi.string()
          .email()
          .required(),
        age: Joi.string()
          .required(),
        fees: Joi.number()
          .integer()
          .required(),
        number: Joi.string().messages({
          "string.base": `"number" should be a type of string`,
          "integer.empty": `"number" must contain value`,
          "string.pattern.base": `"number" must be 10 digit number`,
          "any.required": `"number" is a required field`
        })
          .min(10)
          .max(10)
          .required(),
      })

    try {
      const validation = schema.validate(req.body)
      const { name, email, age, fees, number } = req.body;
      const errors = validationResult(req);
      if (validation.error) {
        res.status(422)
          .send(validation.error?.details[0].message)
      }
      else {
        const data = new StudentModel({
          name: name,
          email: email,
          age: age,
          fees: fees,
          number: number,
          emailToken: crypto.randomBytes(64).toString('hex'),
          emailVerification: false
        });
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(data.password, salt)
        const result = await data.save();
        return res.redirect('/admin/add/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  // All Record List //
  viewAllRecord = async (req: Request, res: Response) => {
    const result = await SessionModel.find({ "key": "email" })
    // console.log(result[0]);
    if (result[0]) {
      try {
        const perPage = 5;
        const page = req.params.page || 1;
        let searchKeyword = req.query.search
        const result = await StudentModel.find(
          searchKeyword ? { name: req.query.search } : {}
        )
          .skip(perPage * Number(page) - perPage)
          .limit(perPage)
        const count = await StudentModel.count(searchKeyword ? { name: req.query.search } : {})
        // console.log(req.query);
        return res.render("list", {
          data: result,
          user: result[0],
          current: page,
          pages: Math.ceil(count / perPage),
          dodyData: undefined,
          search: searchKeyword
        })
      } catch (error) {
        console.log(error);
      }
    }
    else {
      return res.redirect('/admin/login/')
    }
  }

  // Student Data Edit //
  editData = async (req: Request, res: Response) => {
    const result = await SessionModel.find({ "key": "email" })
    try {
      const results = await StudentModel.findById(req.params.id, req.body)
      // console.log(req.body);
      return res.render("edit", {
        data: results,
        user: result[0]
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Update Document //
  updateData = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("/admin/list")
    } catch (error) {
      console.log(error);
    }
  }

  // Delete tabel Record //
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id)
      return res.redirect("/admin/list/1")
    } catch (error) {
      console.log(error)
    }
  }
}
