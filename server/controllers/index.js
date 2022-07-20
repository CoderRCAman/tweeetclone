const { getAuthDetails } = require("../middleware");
const User = require("../models/user");
const Tweet = require("../models/tweet");
const { IncomingForm } = require("formidable");
const _ = require("lodash");
const path = require("path");
const Comment = require("../models/comment");
async function register(req, res) {
  const { user_name, email, password, name } = req.body;
  if (!user_name || !email || !password || !name)
    return res.status(400).json({
      msg: "Missing fields!",
    });
  try {
    const notUsernameUnique = await User.findOne({ user_name: user_name });
    const notEmailUnique = await User.findOne({ email: email });
    if (notUsernameUnique) {
      return res.status(400).json({ msg: "Username already exists!" });
    }

    if (notEmailUnique) {
      return res.status(400).json({ msg: "Email already exists!" });
    }

    const newUser = new User({
      user_name,
      email,
      password,
      name,
    });

    await newUser.save();
    return res.status(201).json({ msg: "User created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if ((!email, !password))
    return res.status(400).json({
      msg: "Missing fields!",
    });
  try {
    const verifyEmail = await User.findOne({ email });
    if (!verifyEmail)
      return res.status(400).json({
        msg: `No such user exist with ${email} try again with a different email`,
      });
    if (!(await verifyEmail.isValidatedPassword(password)))
      return res
        .status(400)
        .json({ msg: `Password didnot match for email ${email}` });
    //set details in cookies
    res.cookie("isLoggedIn", true, {
      maxAge: 7 * 24 * 24 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("user_id", verifyEmail._id, {
      maxAge: 7 * 24 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      msg: "Successfully login",
      user_id: verifyEmail._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR!" });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      msg: `NO ID `,
    });
  try {
    const user = await User.findById(id)
      .populate("tweets")
      .populate({ path: "feeds", populate: "user_id" });
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR!" });
  }
}

async function tweet(req, res) {
  const userDetails = getAuthDetails(req);
  const id = userDetails.user_id;
  options = {
    uploadDir: path.join(__dirname, "..", "pictures"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  };

  const form = new IncomingForm(options);
  try {
    const followers = (await User.findById(id).select("followers")).followers;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }

      if (_.isEmpty(files)) {
        const newTweet = new Tweet({
          content: fields.content,
          user_id: id,
        });
        await newTweet.save();
        await User.findByIdAndUpdate(id, {
          $addToSet: { tweets: newTweet._id },
        });

        await User.findByIdAndUpdate(id, {
          $addToSet: {
            feeds: newTweet._id,
          },
        });
        for (let i = 0; i < followers.length; i++) {
          const fid = followers[i];
          await User.findByIdAndUpdate(fid, {
            $addToSet: {
              notifications: newTweet._id,
              feeds: newTweet._id,
            },
          });
        }

        return res.status(200).json({ msg: "Tweeted!" });
      } else {
        const pictures = {
          download_url: `http://localhost:5000/${files.picture.newFilename}`,
          file_name: files.picture.newFilename,
        };
        const newTweet = new Tweet({
          content: fields.content,
          user_id: id,
          pictures: pictures,
        });
        await newTweet.save();
        await User.findByIdAndUpdate(id, {
          $addToSet: { tweets: newTweet._id },
        });

        await User.findByIdAndUpdate(id, {
          $addToSet: {
            feeds: newTweet._id,
          },
        });
        for (let i = 0; i < followers.length; i++) {
          const fid = followers[i];
          await User.findByIdAndUpdate(fid, {
            $addToSet: {
              notifications: newTweet._id,
              feeds: newTweet._id,
            },
          });
        }

        return res.status(200).json({ msg: "Tweeted!" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}
async function getUser(req, res) {
  const { username } = req.params;
  console.log("ok");
  try {
    const regex = new RegExp(username, "i");
    const user = await User.find({ user_name: regex });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function followRequest(req, res) {
  const { user_id } = getAuthDetails(req); //the user
  const { id } = req.params; //whom he is following
  console.log(user_id, id);
  try {
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: user_id },
    });
    const followersPost = (await User.findById(id).select("tweets")).tweets;
    let recentPost = [];
    if (followersPost.length > 5) {
      for (let i = followersPost.length - 1; i >= followersPost.length - 5; i--)
        recentPost.push(followersPost[i]);
    } else {
      for (let i = followersPost.length - 1; i >= 0; i--)
        recentPost.push(followersPost[i]);
    }

    await User.findByIdAndUpdate(user_id, {
      $addToSet: { followings: id, feeds: { $each: recentPost } },
    });
    return res.status(200).json({
      msg: "Sent follow request!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

async function unfollow(req, res) {
  const { user_id } = getAuthDetails(req); //the user
  const { id } = req.params; //whom he is following
  try {
    await User.findByIdAndUpdate(id, {
      $pull: { followers: user_id },
    });
    await User.findByIdAndUpdate(user_id, {
      $pull: { followings: id },
    });
    return res.status(200).json({
      msg: "Sent follow request!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

async function acceptFollowRequest(req, res) {
  const { user_id } = getAuthDetails(req); //the user
  const { id } = req.params; //whom he has accepted the request
  try {
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: user_id },
    });
    const followersPost = (await User.findById(id).select("tweets")).tweets;
    let recentPost = [];
    if (followersPost.length > 5) {
      for (let i = followersPost.length - 1; i >= followersPost.length - 5; i--)
        recentPost.push(followersPost[i]);
    } else {
      for (let i = followersPost.length - 1; i >= 0; i--)
        recentPost.push(followersPost[i]);
    }

    await User.findByIdAndUpdate(user_id, {
      $addToSet: { followings: id, feeds: { $each: recentPost } },
    });
    return res.status(200).json({
      msg: "Accepted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

async function updateProfile(req, res) {
  const userDetails = getAuthDetails(req);
  const id = userDetails.user_id;
  console.log(id);
  options = {
    uploadDir: path.join(__dirname, "..", "pictures"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  };
  const form = new IncomingForm(options);
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }

      if (_.isEmpty(files)) {
        await User.findByIdAndUpdate(id, {
          name: fields.name,
        });
        return res.status(200).json({ msg: "Updated!" });
      } else {
        const avatar = {
          download_url: `http://localhost:5000/${files.picture.newFilename}`,
          file_name: files.picture.newFilename,
        };

        await User.findByIdAndUpdate(id, {
          name: fields.name,
          avatar: avatar,
        });

        return res.status(200).json({ msg: "Updated!" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function getPostById(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Tweet.findById(id)
      .populate({
        path: "comments",
        populate: "user_id",
      })
      .populate("user_id");
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  try {
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Delete was success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function addComment(req, res) {
  const { id } = req.params;
  const { reply } = req.body;
  const { user_id } = getAuthDetails(req);
  try {
    const newComment = new Comment({
      text: reply,
      user_id: user_id,
    });
    await newComment.save();
    await Tweet.findByIdAndUpdate(id, {
      $addToSet: {
        comments: newComment._id,
      },
    });
    return res.status(200).json({ msg: "Comment added!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function deleteComment(req, res) {
  const { id, postid } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    await Tweet.findByIdAndUpdate(postid, {
      $pull: { comments: id },
    });
    return res.status(200).json({
      msg: "Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function updateLikes(req, res) {
  const { postId } = req.params;
  const { likes } = req.body;

  try {
    await Tweet.findByIdAndUpdate(postId, {
      likes: likes,
    });
    return res.status(200).json({ msg: "Likes updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}
async function getFollowers(req, res) {
  const { user_id } = getAuthDetails(req);
  try {
    const user = await User.findById(user_id)
      .select("followers")
      .populate("followers");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}
async function getFollowings(req, res) {
  const { user_id } = getAuthDetails(req);
  try {
    const user = await User.findById(user_id)
      .select("followings")
      .populate("followings");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function getNotification(req, res) {
  const { user_id } = getAuthDetails(req);
  console.log(user_id);
  try {
    const notifications =
      (
        await User.findById(user_id)
          .select("notifications")
          .populate({ path: "notifications", populate: "user_id" })
      )?.notifications || [];
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  register,
  login,
  getUserById,
  tweet,
  getUser,
  followRequest,
  acceptFollowRequest,
  updateProfile,
  getPostById,
  deletePost,
  addComment,
  deleteComment,
  updateLikes,
  unfollow,
  getFollowers,
  getFollowings,
  getNotification,
};
