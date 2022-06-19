import React, { useEffect, useState } from "react";
import { TwitterOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const [getStartBtn, setGetStartBtn] = useState(false); 
  const navigate = useNavigate() ;
  function delay(time) {
    return new Promise((resolve, reject) => {
      resolve(
        setTimeout(() => {
          setGetStartBtn(true);
        }, time)
      );
    });
  }
  async function wait2Sec() {
    await delay(2000);
  }
  useEffect(() => {
    wait2Sec();
  }, []);
  return (
    <div className="bg-sky-600 h-screen flex justify-center font-family-[Roboto] items-center">
      <div>
        <div className="flex justify-center">
          <p className="text-sky-200 font-bold  text-2xl">
            Like Twitter but hey! it's not!
          </p>
          <TwitterOutlined className="text-white animate-bounce text-4xl opacity-30" />
        </div>
        {!getStartBtn && (
          <div className="text-sky-300 text-lg flex items-center justify-center">
            <p>Gettings thinsg ready for you </p>
            <span className="mt-1 ml-3">
              <PulseLoader speedMultiplier={0.5} color="#7dd3fc" size={10} />
            </span>
          </div>
        )}
        {getStartBtn && (
          <div className="flex justify-center mt-5">
           
           <button onClick={()=> navigate('/home',{replace:true})} className="bg-cyan-100 text-gray-500 font-semibold hover:bg-cyan-200 rounded-sm px-4 py-1 flex items-center">
              Get started
              <ArrowRightOutlined className="ml-3" />
            </button>
          
          </div>
        )}
      </div>
    </div>
  );
}
