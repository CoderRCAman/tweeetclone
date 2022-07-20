import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchUser from "../components/SearchUser";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate,useLocation } from "react-router-dom";
import FollowUsers from '../components/FollowUsers';
import FollowingUsers from '../components/FollowingUsers'; 



export default function Follow() { 
  
  const location = useLocation() ;
  const [tab, setTab] = useState({
    follow: location.state.status==='f'?true:false,
    unfollow:  location.state.status==='uf'?true:false,
  });

  // const isActive =(index) =>{
  //     if(tab===index)

  //     return <div className="border-red-500"></div>
  //     setTab()

  // };
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .red {color: red}
        .green {color: black}
      `}</style>
      <div className="bg-black min-h-screen flex w-full    ">
        <Navbar />
        <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2 ">
          <div className="flex flex-col   px-2 py-1 w-[47.5%]  -mt-2 fixed backdrop-blur-lg">
            <div className="flex items-center mt-2">
              <ArrowLeftOutlined
                className="hover:bg-slate-900 p-2 rounded-full"
                style={{
                  fontSize: "20px",
                  color: "white",
                  marginRight: "20px",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
                onClick={() => navigate(-1)}
              />
              <div>
                <h1 className="text-white text-lg font-bold font-[Roboto] ">
                  Aman Sarma
                </h1>
                <h6 className="text-[#4f4f4f] text-sm font-bold font-[Roboto] ">
                  @aman_sarma
                </h6>
              </div>
            </div>

            {/* Following Start */}
          </div>
       
          <div className=" cursor-pointer text-white font-bold text-lg w-full border-b-[1px] flex mt-20 border-b-gray-800 ">
            <div
              className={`p-2 pb-4 ${
                tab.follow && "border-b-4 border-b-cyan-500"
              } text-center w-[50%] hover:bg-[#181818] `}
              onClick={() => {
                setTab({ follow: true, unfollow: false });
                sessionStorage.setItem('lastpicked','f')

              }}
            >
              Following
            </div>
            <div
              className={`p-3 ${
                tab.unfollow && "border-b-4 border-b-cyan-500"
              } w-[50%] text-center hover:bg-[#181818] `}
              onClick={() => {
                setTab({ follow: false, unfollow: true }); 
                sessionStorage.setItem('lastpicked','uf')
              }}
            >
              Followers
            </div>
           
          </div> 
          {tab.follow &&  <FollowingUsers/> }
          {tab.unfollow && <FollowUsers/> }
          

          
          {/* joh tuneh kiya */}
        

              
                   
                
        
          
        </div>
        <SearchUser />
      </div>
    </>
  );
}
