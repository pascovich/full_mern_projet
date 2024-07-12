import mongoose, { Error } from "mongoose";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {
  signUpErrors,
  signInErrors,
  uploadFileError,
} from "../utils/errorsUtils.js";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";

const pipe = promisify(pipeline);

const ObjectID = mongoose.Types.ObjectId;
const maxAge = 3 * 24 * 60 * 60 * 1000;
// const pipeline = promisify(async (...args) => {
//   const { createPipeline } = await import("stream");
//   return new Promise((resolve, reject) => {
//     createPipeline(...args, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// });

export const signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await userModel.create({
      pseudo,
      email,
      password,
    });
    res.status(200).send({ message: "User created successfully", user });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(500).send({ errors });
  }
};
export const getUsers = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");
    res.status(200).send({ message: "user infos fetch", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const userInfo = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(404).send({ message: "Unknown id" });

    const user = await userModel.findById(req.params.id).select("-password");
    res.send({ message: "user infos", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(404).send({ message: "Unknown id" });
  try {
    //add to follower list
    await userModel
      .findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true }
      )
      .then((docs) => {
        res.send({ message: "user following successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });

    //add to following list
    await userModel
      .findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true }
      )
      .then((docs) => {
        // res.send({ message: "user following successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(404).send({ message: "Unknown id" });
  try {
    //add to follower list
    await userModel
      .findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnFollow } },
        { new: true, upsert: true }
      )
      .then((docs) => {
        res.send({ message: "user unfollowing successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });

    //add to following list
    await userModel
      .findByIdAndUpdate(
        req.body.idToUnFollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true }
      )
      .then((docs) => {
        // res.send({ message: "user following successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).send({ user });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ errors });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

export const uploadProfil = async (req, res) => {
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/jpeg" &&
      // req.file.detectedMineType != "image/jpeg" &&
      req.file.mimetype != "image/png"
    ) {
      throw new Error("invalide format");
    }
    if (req.file.size > 500000) throw new Error("max size");
  } catch (err) {
    const errors = uploadFileError(err);
    // console.log(err);
    return res.status(500).send(errors);
  }
  const filename = req.body.name + ".jpg";
  // console.log(req.file);
  await pipe(
    req.file.stream,
    // fs.createWriteStream(`../client/public/uploads/profil/${filename}`)
    fs.createWriteStream(`${__dirname}/../client/public/uploads/${filename}`)
  );

  // try {
  //   await userModel.findByIdAndUpdate(req.body.userId,
  //     {$set: { picture: "./uploads/profile" + filename }},
  //     {new:true,upsert:true,setDefaultsOnInsert:true}
  //   )
  //   .then((docs)=>{
  //     res.status(200).send({message:"user picture updated ",docs});
  //   }).catch((err)=>{
  //     res.status(500).send(err);
  //   });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
};
