import mongoose from "mongoose";
// Schema
const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    age: { type: String },
    fees: { type: Number },
    number: { type: Number },
});

// Model
const StudentModel = mongoose.model("student", studentSchema);

export default StudentModel;