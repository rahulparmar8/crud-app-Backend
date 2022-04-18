import mongoose from "mongoose";

const userEmailVerification = new mongoose.Schema({
    userId: { type: String },
    value: { type: String }
})

// Model
const EmailVerification = mongoose.model("userEmailVerification", userEmailVerification);

export default EmailVerification;