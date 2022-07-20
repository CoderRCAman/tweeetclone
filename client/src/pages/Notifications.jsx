import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchUser from "../components/SearchUser";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const ns = await axios.get("http://localhost:5000/notification", {
      withCredentials: true,
    });
    console.log(ns.data);
    if (ns.status === 200) setNotifications(ns.data); 
    localStorage.setItem('nf_count' , ns.data.length) ;
  }; 
  

  useEffect(() => {
    getNotifications();
  }, []);
  const navigate = useNavigate(-1);
  return (
    <div className="min-h-screen  bg-black flex">
      <Navbar />
      <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2  ">
        <div className=" backdrop-blur-lg py-2 flex fixed w-[47.5%] -mt-2">
          <div
            className="hover:bg-slate-900 text-center cursor-pointer flex items-center space-x-5  ml-2 h-8 w-8 rounded-full "
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-slate-300 ml-2" />
          </div>
          <p className="text-white font-bold text-lg">Notifications</p>
        </div>
        <div className="text-white  w-full border-b-[1px] border-b-gray-800 mt-10 ">
          <button className="tex-center w-full hover:bg-[#181818] py-3 font-bold ">
            Feeds
          </button>
        </div>
        <div className="text-gray-600 space-y-4">
          {/* contents  */}
          {notifications.map((nf) => (
            <Link
              to={`/post/${nf._id}`}
              className="p-1 flex items-center justify-evenly hover:bg-slate-800 cursor-pointer "
            >
              <img
                className="w-16 h-16 rounded-full "
                src={nf.user_id.avatar.download_url}
              />
              <div className="flex  w-full items-center ">
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-stone-300">
                    {nf.user_id.name}
                  </h1>
                  <h6 className="text-md font-bold text-stone-700">
                    @{nf.user_id.user_name}
                  </h6>
                </div>
                <div className="ml-12 font-semibold text-xl">
                  Has posted a tweet!
                </div>
                <div className="flex items-center ml-16">
                  <h1>at</h1>
                  <div className="flex flex-col items-center text-sm ml-2">
                    <p>{new Date(nf.createdAt).toLocaleTimeString()} </p>
                    <p>{getJoinedDate(new Date(nf.createdAt))}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <SearchUser />
    </div>
  );
}
