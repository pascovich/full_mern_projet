import mongoose, { model } from "mongoose";

const postSchema = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },

    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamps: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
