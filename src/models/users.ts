import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    emailToken: { type: String },
    emailVerification: { type: Boolean }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;