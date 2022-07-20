const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    name : {
      type: String,
      required: true,
    },
    avatar: {
      type: {},
      default: {
        download_url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
        file_name: "",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not valid email`,
      },
      unique: true,
    },

    password: {
      type: String,
      minLength: [3, "Too short password"],
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    tweets : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ],
    notifications :[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ] ,
    feeds : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ] 
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//vadlidate the password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  try {
    return await bcrypt.compare(usersendPassword, this.password);
  } catch (err) {
    console.log(error);
    return false;
  }
};
module.exports = mongoose.model("user", userSchema);
