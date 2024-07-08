import mongoose from "mongoose";
import userModel from "../models/userModel.js";

const ObjectID = mongoose.Types.ObjectId;

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
    res.status(500).send({ message: err.message });
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

    const user = await userModel
      .findById(req.params.id)
      // .findById(req.params.id, (err, docs) => {
      //   if (!err) res.send({ message: "user infos", docs });
      //   else res.send({ message: err });
      // })
      .select("-password");
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
