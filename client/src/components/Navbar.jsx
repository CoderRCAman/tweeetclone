import React, { useEffect, useContext } from "react";
import {
  TwitterOutlined,
  HomeOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { signOut } from "firebase/auth";
import { UserContext } from "../state/UserProvider";
import { Link, useLocation ,useNavigate } from "react-router-dom";
import TweetModal from "./TweetModal";
export default function Navbar() {
  const user_ctx = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate() ;
  const changeClickedState = (state) => {
    const newClickedState = {
      home: false,
      notification: false,
      profile: false,
      logout: false,
    };
    newClickedState[state] = true;
    user_ctx.setNavClicks(newClickedState);
  };
  useEffect(() => {
    if (location) {
      if (location.pathname === "/home") changeClickedState("home");
      if (location.pathname === "/profile") changeClickedState("profile");
      if (location.pathname === "/notification")
        changeClickedState("notification");
    }
  }, [location]);
  return (
    <>
      {user_ctx.tweetModal && <TweetModal />}
      <nav className="max-h-screen  ">
        <div className="hidden  md:block ml-12 w-[250px] max-h-screen overflow-hidden">
          <div className="space-y-7 flex flex-col items-start">
            <Link to="/home">
              <span className="cursor-pointer hover:bg-slate-900 rounded-full text-center h-12 w-12 ml-2 p-2  ">
                <TwitterOutlined className="text-white text-3xl " />
              </span>
            </Link>
            <Link to="/home">
              <div
                className="flex items-center justify-center cursor-pointer hover:bg-slate-900  px-4  pb-2 mr-3 rounded-full"
                onClick={() => changeClickedState("home")}
              >
                <HomeOutlined className="text-white text-3xl" />
                <h1
                  className={`text-white ml-5 font-${
                    user_ctx.navClicks.home ? "bold" : "normal"
                  } mt-2  text-xl`}
                >
                  Home
                </h1>
              </div>
            </Link>
            <Link to="/notification">
              <div
                className="flex items-center cursor-pointer hover:bg-slate-900  px-4  pb-2 mr-3 rounded-full"
                onClick={() => changeClickedState("notification")}
              >
                <BellOutlined className="text-white text-3xl" />
                <h1
                  className={`text-white ml-5 font-${
                    user_ctx.navClicks.notification ? "bold" : "normal"
                  } mt-2 text-xl`}
                >
                  Notifications
                </h1>
              </div>
            </Link>

            <Link to="/profile">
              <div
                className="flex items-center cursor-pointer hover:bg-slate-900  px-4  pb-2 mr-3 rounded-full"
                onClick={() => changeClickedState("profile")}
              >
                <UserOutlined className="text-white text-3xl" />
                <h1
                  className={`text-white ml-5 font-${
                    user_ctx.navClicks.profile ? "bold" : "normal"
                  } mt-2 text-xl`}
                >
                  Profile
                </h1>
              </div>
            </Link>

            <div
              className="flex items-center cursor-pointer hover:bg-slate-900  px-4  pb-2 mr-3 rounded-full"
              onClick={() => {
                changeClickedState("logout");
              }}
            >
              <LogoutOutlined className="text-white text-3xl" />
              <h1
                className={`text-white ml-5 font-${
                  user_ctx.navClicks.logout ? "bold" : "normal"
                } mt-2 text-xl`}
                onClick={()=>{
                   localStorage.clear('firstLogin') ;
                   localStorage.clear('user_id') ;
                   navigate('/login')
                }}
              >
                Log out
              </h1>
            </div>
            <div className="flex items-center cursor-pointer">
              <button
                className="bg-[#1D9BF0] px-20 py-3 text-md font-bold text-white rounded-full"
                onClick={() => user_ctx.setTWeetModal(true)}
              >
                Tweet
              </button>
            </div>
          </div>
          {user_ctx && (
            <div className="flex items-center space-x-2 mt-32 hover:bg-slate-900 mr-3 px-3 rounded-full  cursor-pointer">
              <div>
                <img
                  src={user_ctx.user?.avatar.download_url}
                  alt="sas"
                  className="bg-white h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-slate-400">
                  {user_ctx.user?.name}
                </h1>
                <h1 className="text-cyan-600 font-bold max-w-[180px]">
                  @{user_ctx.user?.user_name}
                </h1>
              </div>
            </div>
          )}
        </div>
        <div className="fixed bottom-0 md:hidden">
          <div className="flex  pb-3 pt-1 px-4 w-screen justify-between border-t-[1px] border-t-gray-600">
            <div className="cursor-pointer">
              <HomeOutlined className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer">
              <BellOutlined className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer">
              <UserOutlined className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer">
              <LogoutOutlined className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
