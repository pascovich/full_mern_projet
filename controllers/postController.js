import mongoose from "mongoose";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

const ObjectID = mongoose.Types.ObjectId;

export const createPost = async (req, res) => {
  const { posterId, message, video, likers, comments } = req.body;

  try {
    const post = await postModel.create({
      posterId,
      message,
      video,
      likers,
      comments,
    });
    return res.status(200).send({ message: "post created successfully", post });
  } catch (err) {
    return res.status(400).send({ err });
  }
};
export const readPost = async (req, res) => {
  try {
    const post = await postModel.find();
    res.status(200).send({ message: "user infos fetch", post });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(404).send({ message: "Unknown id" });
    const updatePost = {
      message: req.body.message,
    };
    postModel
      .findByIdAndUpdate(req.params.id, { $set: updatePost }, { new: true })
      .then((docs) => {
        res.send({ message: "post updated successfully ", docs });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(404).send({ message: "Unknown id" });

    postModel
      .findByIdAndDelete(req.params.id)
      .then((docs) => {
        res.send({ message: "post deleted successfully ", docs });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
