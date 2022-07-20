import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 700);
  });
};
function ChotaComponent({ user }) {
  const [status, setStatus] = useState("Following");
  const handleFollow = async (type) => {
    if (type) {
      //follow logic
      const fRes = await axios.post(
        `http://localhost:5000/follow/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (fRes.status === 200) {
        toast.success("Followed!");
        await Sleep();
        window.location.reload();
      } else {
        toast.error("Could not follow!");
      }
    } else {
      // unfollow logic
      const fRes = await axios.post(
        `http://localhost:5000/unfollow/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (fRes.status === 200) {
        toast.success("Unfollowed!");
        await Sleep();
        window.location.reload();
      } else {
        toast.error("Could not unfollow!");
      }
    }
  };
  return (
    <div className=" p-4 flex items-center ">
      <img className="w-16 h-16 rounded-full " src={user.avatar.download_url} />
      
      <div className="flex justify-between w-full">
        <Link to={`/profile/${user._id}`} className="ml-4">
          <h1 className="text-xl font-bold text-stone-300">{user?.name}</h1>
          <h6 className="text-md font-bold text-stone-700">
            @{user?.user_name}
          </h6>
        </Link>
        <div className="flex justify-end h-8">
          <button
            onClick={() => handleFollow(false)}
            onMouseEnter={() => setStatus("Unfollow")}
            onMouseLeave={() => setStatus("Following")}
            className={` ${
              status === "Unfollow"
                ? "bg-[#210C0D] border-[1px] border-red-600 text-red-600"
                : "hover:bg-stone-900 border-[#959393] text-white"
            } font-bold  text-sm px-4 py-1  border-2  rounded-full`}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FollowingUsers() {
  const [users, setUser] = useState([]);
  const getUsers = async () => {
    const guRes = await axios.get("http://localhost:5000/followings", {
      withCredentials: true,
    });
    console.log(guRes.data);
    if (guRes.status === 200) setUser(guRes.data.followings);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div> 
      <Toaster />
      {users.map((user) => (
        <ChotaComponent user={user} />
      ))}
    </div>
  );
}
