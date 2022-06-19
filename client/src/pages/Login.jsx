import React, { useEffect, useContext ,useState} from "react";
import twitterGif from "../assets/icons8-twitter-gif.gif";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../state/UserProvider";
import slugify from "slugify";
import shortid from "shortid";
import toast ,{Toaster} from 'react-hot-toast' 
import { TwitterOutlined } from "@ant-design/icons";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const user_ctx = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email) {
      toast.error("Please enter email!");
    }
    if (!user.password) {
      toast.error("Please enter password!");
    }
    try {
      const postResponse = await axios.post(
        "http://localhost:5000/login",
        user,
        {
          withCredentials:true
        }
      );
      if (postResponse.status === 200) {
        toast.success(postResponse.data.msg);
        localStorage.setItem('firstLogin',true) ; 
        localStorage.setItem('user_id',postResponse.data.user_id) ;  
        navigate('/home')
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-screen  grid md:grid-cols-2"> 
    <Toaster/>
      <div className="hidden md:block relative">
        <TwitterOutlined className="text-white absolute text-[300px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] " />

        <img
          alt=""
          draggable="false"
          src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
          className=" w-full object-cover   h-screen"
        />
      </div>
      <div className="bg-black">
        <div className=" ml-10  mt-10 space-y-10 flex flex-col justify-evenly">
          <div>
            <TwitterOutlined className="text-white text-4xl" />
          </div>
          <h1 className="md:text-6xl text-4xl  text-white font-bold">
            Happening Now!
          </h1>
          <div>
            <h1 className="text-cyan-200 font-familiy-[Roboto] text-2xl ">
              Login in to your account!
            </h1>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <label className="text-gray-300 text-xl font-semibold">
                Email
              </label>
              <input
                required
                name = 'email' 
                onChange={handleChange}
                type="email"
                className="w-72 h-10 p-2 rounded-sm outline-none font-semibold"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-300 text-xl font-semibold">
                Password
              </label>
              <input
                required
                name = 'password'
                onChange={handleChange}
                type="password"
                className="w-72 h-10 p-2 rounded-sm outline-none font-semibold"
                placeholder="Password"
              />
            </div>
            <button className="bg-blue-400 px-4 py-1 text-lg font-bold text-white rounded-sm ">
              Login
            </button>

            <Link to="/register">
              <p className=" mt-4 font-bold text-gray-400">Not Registered?</p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
