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
    res
      .status(200)
      .send({ message: "user infos fetch", post })
      .sort({ createdAt: -1 });
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

export const likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send({ message: "Unknown id" });
  try {
    //add to follower list
    await postModel
      .findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.idPers } },
        { new: true }
      )
      .then((docs) => {
        res.send({ message: "post liked successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });

    //add to following list
    await userModel
      .findByIdAndUpdate(
        req.body.idPers,
        { $addToSet: { likes: req.params.id } },
        { new: true }
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

export const unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send({ message: "Unknown id" });
  try {
    //add to follower list
    await postModel
      .findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.id } },
        { new: true }
      )
      .then((docs) => {
        res.send({ message: "post unliked successfully", docs });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });

    //add to following list
    await userModel
      .findByIdAndUpdate(
        req.body.id,
        { $pull: { likes: req.params.id } },
        { new: true }
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

export const commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send({ message: "Unknown id" });
  try {
    postModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true }
      )
      .then((docs) => {
        res.send({ message: "post commented successfully", docs });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send({ message: "Unknown id" });
  try {
    postModel
      .findById(req.params.id)
      .then((docs) => {
        const thecomment = docs.comments.find();
        // const thecomment = docs.comments.find((comment) => {
        //   comment._id.equals(req.body.commentId);
        return res.send(thecomment);
        //   return res.send(comment._id + " " + req.body.commentId);
        // });

        // if (!thecomment) return res.status(404).send("comment not found");
        // thecomment.text = req.body.text;
        // return docs.save((err) => {
        //   if (!err)
        //     return res
        //       .status(200)
        //       .send({ message: "post commented updated", docs });
        //   return res.status(500).send(err);
        // });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send({ message: "Unknown id" });
  try {
    postModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            _id: req.body.commenterId,
          },
        },
        { new: true }
      )
      .then((docs) => {
        res.send({ message: "comment deleted successfully", docs });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
