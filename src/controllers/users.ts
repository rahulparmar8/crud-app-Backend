import express, { Request, Response } from "express";
import StudentModel from '../models/student'

export default class Student {

  // Get All Student Data //
  getData = async (req: Request, res: Response) => {
    // const data = await StudentModel.find()
    //console.log(data);
    return res.render("addstudent")
  }

  // Create Student Data //
  addStudentData = async (req: Request, res: Response) => {

    //console.log(req.body);
    try {
      const { name, email, age, fees, number } = req.body;
      //console.log(req.body);
      const data = new StudentModel({
        name: name,
        email: email,
        age: age,
        fees: fees,
        number: number,
      });
      const result = await data.save();
      return res.redirect('/admin/add/')
    } catch (error) {
      console.log(error);
    }
  }

  // All record list //
  viewAllRecord = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.find({})
      return res.render("list", {
        data: result,
        dodyData: undefined
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Student Data edit //
  editData = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findById(req.params.id, req.body)
      // console.log(req.body);

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
      return res.redirect("/admin/list")
    } catch (error) {
      console.log(error);
    }
  }

  // Delete tabel Record //
  deleteRecord = async (req: Request, res: Response) => {
    try {
      // console.log('i m here')
      const result = await StudentModel.findByIdAndDelete(req.params.id)
      return res.redirect("/admin/list")
    } catch (error) {

      console.log(error)
    }
  }
}
