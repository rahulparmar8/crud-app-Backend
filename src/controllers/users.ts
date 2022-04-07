import express, { Request, Response } from "express";
import StudentModel from '../models/student'

export default class Student {

  // Get All Student Data //
  getData = async (req: Request, res: Response) => {
    const data = await StudentModel.find()
    // const arr = {
    //   "data":data,
    //   "bodyData":req.body
    // }
    //console.log(data);
    return res.render("addstudent", data)
  }

  // Create Student Data //
  addStudentData = async (req: Request, res: Response) => {
    const { name, email, age, fees, number } = req.body;
    //console.log(req.body);

    // if (!name || !email || !age || !fees || !number) {
    //   return res.status(422).json({ erroe: "Field The Properly" })
    // }
    try {
      const result = await StudentModel.find()
      return res.render("addstudent", {
        bodyData: req.body,
        data: result,
      });

      // const userExist = await StudentModel.findOne({ email: email })
      // if (userExist) {
      //   return res.status(400).json({ error: "Email already exist" })
      // }
      // const user = new StudentModel({ name, email, age, fees, number });
      // await user.save();
      // return res.render("addname",{
      //   bodyData:req.body
      // })
      // return res.status(201).json({ message: "Successfully Saved :)" })
    } catch (error) {
      console.log(error);
    }
  }

  // All record list //
  viewAllRecord = async (req: Request, res: Response) => {
    try {
      await StudentModel.find({}, function (err, user) {
        if (err) console.log(err);
        console.log(user);
        return res.render("list", {
          data: user,
          dodyData: undefined
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Student Data edit //
  editData = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findById(req.params.id, req.body)
      console.log(req.body);

      return res.render("edit", {
        data: result
      })
    } catch (error) {
      console.log(error);
    }
  }
  //Update document
  updateData = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("/admin/list/")
    } catch (error) {

    }
  }

  // Delete tabel Record //
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id)
      return res.redirect("/admin/list/")
    } catch (error) {
      console.log(error)
    }
  }
}
