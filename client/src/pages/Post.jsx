import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchUser from "../components/SearchUser";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../state/UserProvider";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 1000);
  });
};

const getJoinedDate = (date) => {
  const newDate = new Date(date);
  return (
    monthNames[newDate.getMonth()] +
    " " +
    newDate.getDate() +
    ", " +
    newDate.getFullYear().toString()
  );
};

export default function Post() {
  const params = useParams();
  const user_ctx = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState("");
  const { postId } = params;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();
  const my_id = localStorage.getItem("user_id");

  const getPostById = async () => {
    try {
      const postRes = await axios.get(`http://localhost:5000/post/${postId}`);
      console.log(postRes.data);
      if (postRes.status === 200) {
        setPost(postRes.data);
        const Likes = postRes.data.likes;
        setLiked(Likes.find((l) => l === my_id) ? true : false);
        setLikes(Likes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikes = async (status) => {
    if (status) {
      const Likes = [...likes];
      Likes.push(my_id);
      setLikes(Likes);
      const likeRes = await axios.post(`http://localhost:5000/like/${postId}`, {
        likes: Likes,
      });
      if (likeRes.status === 200) toast.success("Liked!");
    } else {
      const newLikes = likes.filter((l) => l !== my_id);
      setLikes(newLikes);
      const likeRes = await axios.post(`http://localhost:5000/like/${postId}`, {
        likes: newLikes,
      });
      if (likeRes.status === 200) toast.error("Removed liked!");
    } 
    setLiked(status);
  };
  const addReply = async () => {
    try {
      const replyRes = await axios.post(
        `http://localhost:5000/comment/${postId}`,
        {
          reply: reply,
        },
        {
          withCredentials: true,
        }
      );
      if (replyRes.status === 200) {
        toast.success("Replied!");
        await Sleep();
        window.location.reload();
      } else toast.error("Failed to reply!");
    } catch (error) {
      toast.error("Failed to add comment!");
    }
  };

  const deleteComment = async (cid) => {
    try {
      const deleteRes = await axios.delete(
        `http://localhost:5000/comment/${cid}/${postId}`
      );
      if (deleteRes.status === 200) {
        toast.success("Deleed ");
        await Sleep();
        window.location.reload();
      } else {
        toast.error("Failed to delete!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  return (
    <div className="bg-black min-h-screen flex w-full    ">
      <Navbar />
      <Toaster />
      <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2 ">
        <h1
          onClick={() => (contentRef.current.scrollTop = 0)}
          className="text-white font-bold text-xl py-3 px-4 w-[47.5%] cursor-pointer -mt-2 fixed backdrop-blur-lg "
        >
          Tweet
        </h1>
        <div className="mt-12 p-2 flex items-center ">
          <div>
            <img
              className="h-12 w-12 rounded-full"
              src={post?.user_id.avatar.download_url}
            />
          </div>
          <div
            className="ml-2  cursor-pointer"
            onClick={() => navigate(`/profile/${post?.user_id._id}`)}
          >
            <p className="text-white text-lg font-semibold -mb-1  ">
              {post?.user_id.name}
            </p>
            <p className="text-gray-400 m-0 text-md">
              @{post?.user_id.user_name}
            </p>
          </div>
        </div>
        <div className="p-2">
          <p className="text-white text-2xl">{post?.content}</p>
          {post?.pictures && <img src={post?.pictures.download_url} alt="" />}
        </div>
        <div className=" m-2 pb-2 text-gray-400 flex items-center border-b-gray-800 border-b-[1px]">
          {/* time stamp  */}
          <p>{new Date(post?.createdAt).toLocaleTimeString()}</p>
          <p className="ml-1 mr-1 mb-2 "> . </p>
          <p>{getJoinedDate(post?.createdAt)}</p>
        </div>
        <div className="flex m-2 pb-2  border-b-gray-800 border-b-[1px] text-sm">
          {/* comments and likes counts  */}
          <p className="text-slate-400">
            <span className="text-white font-bold">
              {post?.comments.length}
            </span>{" "}
            Comments
          </p>
          <p className="text-slate-400 ml-10 ">
            <span className="text-white font-bold">{likes.length}</span>{" "}
            Likes
          </p>
        </div>
        <div
          onClick={() => {
            handleLikes(!liked);
           
          }}
          className={`text-white ${
            liked && "text-pink-600"
          } cursor-pointer text-2xl flex  border-b-gray-800 m-2 py-2 justify-center border-b-[1px] `}
        >
          {/* add like  */}
          <HeartOutlined />
        </div>

        <div className="m-2  border-b-gray-800 border-b-[1px]  py-5 flex justify-between ">
          <div className="flex space-x-2">
            <img
              src={user_ctx?.user?.avatar.download_url}
              className="h-12 w-12 rounded-full"
              alt=""
            />
            <TextareaAutosize
              onChange={(e) => setReply(e.target.value)}
              className="bg-black text-white resize-none font-[Roboto] text-xl md:w-[70%] outline-none mt-2"
              placeholder="Add your reply!"
            />
          </div>
          <button
            onClick={() => addReply()}
            disabled={reply === ""}
            className={`${
              reply ? "bg-[#198CD8]" : "bg-[#134D77]"
            }  h-10 w-20 rounded-full cursor-pointer font-bold text-white `}
          >
            Reply
          </button>
        </div>

        <div>
          {/* show comments  */}
          {post?.comments.map((comment) => (
            <div className="px-5 flex items-start justify-between py-3 space-x-3 border-t-[1px] border-t-gray-800">
              <div className="flex space-x-2">
                <img
                  src={comment?.user_id.avatar.download_url}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div className="text-white font-[Roboto]">
                  <h1 className="font-bold text-lg"> {comment?.user_id.name}</h1>
                  <p>{comment.text}</p>
                </div>
              </div>
              {my_id === comment.user_id._id && (
                <button onClick={() => deleteComment(comment._id)}>
                  <DeleteOutlined className="text-white hover:text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <SearchUser />
    </div>
  );
}
