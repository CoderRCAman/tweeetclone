const mongoose = require("mongoose");
const comment = require("./comment");
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    pictures: {
      type: {},
      default: null,
    },
    likes: [
      {
        type: String,
        default: [],
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tweet", tweetSchema);
