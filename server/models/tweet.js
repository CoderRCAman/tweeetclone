const mongoose = require("mongoose");
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    pictures: [],
    likes : {
        type : Number,
        default :0
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        }
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
