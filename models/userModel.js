import mongoose, { model } from "mongoose";
// import { isEmail } from "validator";
import bcrypt from "bcrypt";

import pkg from "validator";
const { isEmail } = pkg;

const userSchema = mongoose.Schema(
  {
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
    bio: {
      type: String,
      max: 1024,
      // default: "No bio provided.",
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },

    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// do this before save data
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
