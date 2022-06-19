import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Profile() {
  const user_ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
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
  // const fetchAllPost = async (tweets) => {
  //   const allTweets = [];
  //   console.log(tweets.length)
  //   if (tweets.length === 0) return allTweets;
  //   for (let i = 0; i < tweets.length; ++i) {
  //     const docRef = doc(db, "tweet", tweets[i]);
  //     const tweet = await getDoc(docRef);
  //     if (tweet.exists()) allTweets.push(tweet.data());
  //   }  
  //   setTweets(allTweets) ;
  // };
  // useEffect(() => {
  //   if (user_ctx.user.user_info) {
  //     fetchAllPost(user_ctx.user.user_info.tweets);
  //   }
  // }, [user_ctx.user.user_info]);

  const getJoinedDate = (date) => {
    const newDate = new Date(date);
    return (
      monthNames[newDate.getMonth()] + " " + newDate.getFullYear().toString()
    );
  };
  return (
    <div className="bg-black min-h-screen flex w-full    ">
      <Navbar />
      <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2 ">
        <div className="flex items-center space-x-4 px-2 py-1 w-[47.5%]  -mt-2 fixed backdrop-blur-lg">
          <div
            className="hover:bg-slate-900 text-center cursor-pointer  h-8 w-8 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-slate-300" />
          </div>
          <div >
            <h1 className="text-white text-xl font-bold font-[Roboto]">
              {user_ctx?.user?.name}
            </h1>
            <p className="text-gray-500 text-sm">
              {user_ctx?.user?.tweets
                ? user_ctx?.user?.tweets.length
                : 0}{" "}
              Tweets
            </p>
          </div>
        </div>

        <div className=" mt-20 px-5">
          {/* Main profile section  */}
          <div className="flex justify-between items-center">
            <img
              src={user_ctx?.user?.avatar.download_url}
              alt=""
              className="rounded-full h-32 w-32"
            />
            <button className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-full w-20 px-2 py-1 flex  items-center">
              <EditOutlined className="mr-3" /> Edit
            </button>
          </div>
          <div className="mt-5">
            <h1 className="text-white text-xl font-bold">
              {user_ctx?.user?.name}
            </h1>
            <h2 className="text-gray-500">
              @{user_ctx?.user?.user_name}
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarOutlined className="text-gray-400" />
              <h1 className="text-gray-400">
                Joined{" "}
                {getJoinedDate(user_ctx?.user?.createdAt)}
              </h1>
            </div>
            <p className="text-gray-400">
              <span className="text-white font-bold mr-1">
                {user_ctx?.user?.followings?.length > 0
                  ? user_ctx?.user?.followings?.length
                  : "0"}
              </span>
              Following
              <span className="text-white font-bold ml-4 mr-1 ">
                {user_ctx?.user?.followers?.length > 0
                  ? user_ctx?.user?.followers?.length
                  : "0"}
              </span>
              Followers
            </p>
          </div>
        </div>

        <div className="border-b-[1px] border-b-gray-800 w-full px-2 py-2">
          {/* render all tweets  */}
          <h1 className="text-white font-bold mt-6 ml-6">Tweets</h1>
        </div>
        {user_ctx?.user?.tweets.length === 0 ? (
          <div className="px-5 flex items-start py-3 space-x-3 border-t-[1px] border-t-gray-800">
            <img
              src={user_ctx?.user?.user?.photoURL}
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <div className="text-white font-[Roboto]">
              <h1 className="font-bold text-lg">
                {" "}
                {user_ctx?.user?.user?.displayName}
              </h1>
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
          user_ctx?.user?.tweets.map((tweet) => (
            <div className="px-5 flex items-start py-3 space-x-3 border-t-[1px] border-gray-800">
              <img
                src={user_ctx?.user?.avatar.download_url}
                alt=""
                className="h-12 w-12 rounded-full"
              />
              <div className="text-white font-[Roboto]">
                <h1 className="font-bold text-lg">
                  {" "}
                  {user_ctx?.user?.name}
                </h1>
                <p>{tweet.content}</p>
               
                {tweet.picture && (
                    <img
                      src={tweet.picture}
                      alt=""
                      className="rounded-md  mt-2"
                    />
                  )}

                <div className="flex space-x-10">
                    <div className="group flex items-center cursor-pointer space-x-2"> 
                      <CommentOutlined className="text-gray-500 text-lg mt-2    group-hover:text-[#1D9BF0] " />
                      <p className="mt-3 text-sm text-slate-600 group-hover:text-[#1d9bf0]">10</p>
                    </div> 
                    <div className="group flex items-center space-x-2 cursor-pointer"> 
                      <HeartOutlined className="text-gray-500 text-lg mt-2 cursor-pointer   group-hover:text-[#8C174A] " />
                      <p className="mt-3 text-sm text-slate-600 group-hover:text-[#8C174A]">10</p>
                    </div> 
                    <div className="group flex items-center space-x-2 cursor-pointer"> 
                      <DeleteOutlined  className="text-gray-500 text-lg mt-2 cursor-pointer   group-hover:text-red-600 " />
                     
                    </div>
                  </div>

              </div>  
              
            </div>
          ))
        )}
      </div>
      <SearchUser />
    </div>
  );
}
