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
    console.log(data);
    return res.send(data)
  }
  // Create Student Data //
  addStudentData = async (req: Request, res: Response) => {
    const { name, email, age, fees, number } = req.body;
    console.log(req.body);

    // if (!name || !email || !age || !fees || !number) {
    //   return res.status(422).json({ erroe: "Field The Properly" })
    // }
    try {
      // const userExist = await StudentModel.findOne({ email: email })
      // if (userExist) {
      //   return res.status(400).json({ error: "Email already exist" })
      // }
      const user = new StudentModel({ name, email, age, fees, number });
      await user.save();
      return res.status(201).json({ message: "Successfully Saved :)" })
    } catch (error) {
      console.log(error);
    }
  }
  // All record list //
  viewAllRecord = async (req: Request, res: Response) => {
    try {

    } catch (error) {
      console.log(error);
    }
  }
  // Student Data edit //
  editData = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndUpdate(req.params.id, req.body)
      console.log(req.body);
      
      return res.status(200).json({ message: "Data Update" })
    } catch (error) {
      console.log(error);
    }
  }
  // Delete tabel Record //
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id)
      return res.status(200).json({ message: "Data Deleted", code: 200 })
    } catch (error) {
      console.log(error)
    }
  }
}
