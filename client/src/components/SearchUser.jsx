import React,{useState,useRef} from "react";
import {SearchOutlined} from '@ant-design/icons' ;
export default function SearchUser() { 
    const [searchFocus,setSearchFocus] = useState(false) ;
    const inputRef = useRef(null) ;
  return (
    <div
    tabIndex={0}
      className="w-[800px] ml-10 h-[100px]"
      onFocus={() => {
        setSearchFocus(true); 
        inputRef.current.focus() ;
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
            className=" outline-none w-full h-full text-white bg-[#212327] ml-4"
          />
        </div>
      </form>
      {searchFocus && (
        <div className="bg-black  min-h-[90px] px-4 py-3 search-dropshadow border-[1px] w-[98%] rounded-md  ">
          <p className="text-white" onClick={() => console.log("sjsj")}>
            Currently in developing mode
          </p>
        </div>
      )}
    </div>
  );
}
