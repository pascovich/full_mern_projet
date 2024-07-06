import mongoose, { model } from "mongoose";
// import { isEmail } from "validator";

import pkg from "validator";
const { isEmail } = pkg;

const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 55,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    max: 1024,
    trim: true,
  },
});
const userModel = mongoose.model("users", userSchema);

export default userModel;
