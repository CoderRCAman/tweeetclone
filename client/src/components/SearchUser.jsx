import React, { useState, useRef } from "react";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useDebouncedCallback } from "use-debounce";
import { UserContext } from "../state/UserProvider";
import axios from "axios";
import { useContext } from "react";
import { SkewLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Loader from "react-spinners/BarLoader";
export default function SearchUser() {
  const [searchFocus, setSearchFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const userExists = (id) => {
    const followers = userCtx.user.followers;
    const followings = userCtx.user.followings;
    if (followers.find((user) => user._id === id)) return true;
    else if (followings.find((user) => user._id === id)) return true;
    else false;
  };

  const debounced = useDebouncedCallback(
    // function
    async (value) => {
      if (!value) {
        setResult([]);
        return;
      }
      const res = await axios.get(`http://localhost:5000/users/${value}`);
      if (res.status === 200) {
        setResult(res.data);
      } 
      setLoading(false) ;
    },
    // delay in ms
    1000
  );
  return (
    <div
      tabIndex={0}
      className="w-[800px] ml-10 h-[100px]"
      onFocus={() => {
        setSearchFocus(true);
        inputRef.current.focus();
      }}
      onBlur={() => {
        setSearchFocus(false);
      }}
    >
      <form>
        <div
          className={`flex bg-[#212327] mt-5 w-[95%] py-[10px] px-6 items-center rounded-full border-[1px]  ${
            searchFocus ? "border-[#36adfc]" : "border-black"
          }`}
        >
          <SearchOutlined
            className={`${
              searchFocus ? "text-[#36adfc]" : "text-gray-500"
            }  text-lg`}
          />

          <input
            type="text"
            placeholder="Search user"
            ref={inputRef}
            onChange={(e) => {
              setLoading(true)
              if (e.target.value === "") {
                setResult(null);
                setLoading(false)
                return;
              }
              debounced(e.target.value); 
              
            }}
            className=" outline-none w-full h-full text-white bg-[#212327] ml-4"
          />
        </div>
      </form>

      <div className="mt-5 space-y-2 mx-3">
        {loading ? ( 
          <div className="flex justify-center">

            <SkewLoader color='#0e7490' />
          </div>
        ) : result && result.length > 0 ? (
          <div className="space-y-2">
            {result.map((user) => (
              <div className="flex items-center justify-between">
                <div
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="flex items-center cursor-pointer"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatar.download_url}
                  />
                  <h1 className="text-white ml-2">{user.name}</h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          result && <p className="text-white text-bold"> No user found! </p>
        )}
      </div>
    </div>
  );
}
