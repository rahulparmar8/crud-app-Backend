import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;