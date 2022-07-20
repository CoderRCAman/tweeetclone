import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchUser from "../components/SearchUser";
import {
  ArrowLeftOutlined,
  EditOutlined,
  CalendarOutlined,
  HeartOutlined,
  CommentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../state/UserProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
    }, 700);
  });
};
export default function ViewProfile() {
  const user_ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [status,setStatus] = useState("Following") ;
  const params = useParams();
  const { id } = params;
  const my_id = localStorage.getItem("user_id");

  const getUserInfo = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/user/${id}`, {
        withCredentials: true,
      });
      if (userResponse.status === 200) setUser(userResponse.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getJoinedDate = (date) => {
    const newDate = new Date(date);
    return (
      monthNames[newDate.getMonth()] + " " + newDate.getFullYear().toString()
    );
  };

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

  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <div className="bg-black min-h-screen flex w-full    ">
      <Navbar />
      <Toaster />
      <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2 ">
        <div className="flex items-center space-x-4 px-2 py-1 w-[47.5%]  -mt-2 fixed backdrop-blur-lg">
          <div
            className="hover:bg-slate-900 text-center cursor-pointer  h-8 w-8 rounded-full"
            onClick={() => navigate(-1)} 
          >
            <ArrowLeftOutlined className="text-slate-300" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold font-[Roboto]">
              {user?.name}
            </h1>
            <p className="text-gray-500 text-sm">
              {user?.tweets ? user?.tweets.length : 0} Tweets
            </p>
          </div>
        </div>

        <div className=" mt-20 px-5">
          {/* Main profile section  */}
          <div className="flex justify-between items-center">
            <img
              src={user?.avatar?.download_url}
              alt=""
              className="rounded-full h-32 w-32"
            />

            {my_id !== id && (
              <div>
                {user?.followers.find((item) => item === my_id) ? (
                  <button
                    onClick={() => handleFollow(false)}
                    className={` ${status==='Unfollow' ?'bg-[#210C0D] border-[1px] border-red-600 text-red-600':'bg-cyan-600'} text-white font-bold rounded-full w-24 py-1`}
                    onMouseEnter={()=>setStatus('Unfollow')}
                    onMouseLeave={()=>setStatus('Following')}

                  >
                    {status}
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(true)}
                    className="bg-gray-700 hover:bg-gray-600 font-bold text-white rounded-full w-20 px-2 py-1 "
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-5">
            <h1 className="text-white text-xl font-bold">{user?.name}</h1>
            <h2 className="text-gray-500">@{user?.user_name}</h2>
            <div className="flex items-center space-x-2">
              <CalendarOutlined className="text-gray-400" />
              <h1 className="text-gray-400">
                Joined {getJoinedDate(user?.createdAt)}
              </h1>
            </div>
            <p className="text-gray-400">
              <span className="text-white font-bold mr-1">
                {user?.followings?.length > 0 ? user?.followings?.length : "0"}
              </span>
              Following
              <span className="text-white font-bold ml-4 mr-1 ">
                {user?.followers?.length > 0 ? user?.followers?.length : "0"}
              </span>
              Followers
            </p>
          </div>
        </div>

        <div className="border-b-[1px] border-b-gray-800 w-full px-2 py-2">
          {/* render all tweets  */}
          <h1 className="text-white font-bold mt-6 ml-6">Tweets</h1>
        </div>
        {user?.tweets?.length === 0 ? (
          <div className="px-5 flex items-start py-3 space-x-3 border-t-[1px] border-t-gray-800">
            <img
              src={user?.avatar.download_url}
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <div className="text-white font-[Roboto]">
              <h1 className="font-bold text-lg"> {user?.name}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                asperiores sit, facilis iure iusto perferendis repellat nulla
                ipsum excepturi eos rem, accusamus earum quia ab odit inventore
                adipisci id cupiditate? Aspernatur reiciendis repudiandae
                voluptatum harum veniam, cupiditate temporibus illum perferendis
                consectetur quae voluptates ea vitae, hic error! Laudantium,
                necessitatibus error! Repellendus officiis ex consequuntur
                voluptas maxime. In distinctio labore expedita? Inventore,
                recusandae reiciendis! Nostrum beatae, laborum rem sint id vel
                culpa ab cumque laboriosam! Aut illum sapiente eos alias nemo
                omnis provident nesciunt numquam consectetur natus quis autem,
                unde quasi? Quam eius ipsum nesciunt, explicabo reiciendis
                voluptate optio obcaecati consectetur labore excepturi in
                repudiandae possimus perspiciatis minus, perferendis accusamus
                est nisi consequatur itaque autem cumque tempora ipsam facilis?
                Perspiciatis, eum. Velit non commodi odit, saepe quas enim
                laborum itaque eos, porro temporibus ab consequuntur fugit!
                Fugit explicabo assumenda qui ipsa, voluptate odit nobis hic
                optio. Placeat explicabo quam impedit consequatur? A quia
                repellendus ad et modi vitae sed quod qui placeat rem harum
                accusantium quibusdam error corrupti, laudantium blanditiis
                iusto? Expedita temporibus maiores aut mollitia quidem modi eum
                nulla! Aperiam! Aliquid corporis necessitatibus fugit,
                consequuntur itaque illum veniam, ut nesciunt eum error
                molestiae eos quisquam commodi eius esse laboriosam temporibus
                earum accusamus aperiam nulla voluptas sint. Dolore corrupti
                nihil deserunt! Ex blanditiis natus ducimus excepturi dolores
                voluptatem, facilis ea aliquid ad eos reprehenderit veritatis
                iusto, incidunt recusandae placeat voluptas assumenda saepe.
                Voluptatibus, culpa? Quia, natus! Consequatur dignissimos
                deserunt doloremque ad! Exercitationem reprehenderit possimus
                dolorum doloribus recusandae excepturi velit, delectus
                blanditiis, nihil nisi odit facere beatae non quam dolores eum
                corporis sapiente omnis totam eius et! Tempora libero
                consequatur harum ipsam. Culpa magni quaerat necessitatibus
                perspiciatis autem fugit itaque vero perferendis odio
                repudiandae recusandae aliquam, optio nobis? Esse impedit optio
                saepe dolor. Fugit at omnis doloremque iusto temporibus velit
                ducimus dolor!
              </p>
            </div>
          </div>
        ) : (
          user?.tweets
            .slice(0)
            .reverse()
            .map((tweet) => (
              <>
                <div
                  onClick={() => navigate(`/post/${tweet._id}`)}
                  className="px-5 cursor-pointer flex items-start py-3 space-x-3 border-t-[1px] border-gray-800"
                >
                  <img
                    src={user?.avatar.download_url}
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="text-white font-[Roboto]">
                    <h1 className="font-bold text-lg"> {user?.name}</h1>
                    <p>{tweet.content}</p>

                    {tweet.pictures && (
                      <img
                        src={tweet.pictures.download_url}
                        alt=""
                        className="rounded-md  mt-2"
                      />
                    )}
                    <div className="flex space-x-10 ">
                      <div className="group flex items-center cursor-pointer space-x-2">
                        <CommentOutlined className="text-gray-500 text-lg mt-2    group-hover:text-[#1D9BF0] " />
                        <p className="mt-3 text-sm text-slate-600 group-hover:text-[#1d9bf0]">
                          {tweet.comments.length}
                        </p>
                      </div>
                      <div className="group flex items-center space-x-2 cursor-pointer">
                        <HeartOutlined className="text-gray-500 text-lg mt-2 cursor-pointer   group-hover:text-[#8C174A] " />
                        <p className="mt-3 text-sm text-slate-600 group-hover:text-[#8C174A]">
                          {tweet.likes.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
        )}
      </div>
      <SearchUser />
    </div>
  );
}
