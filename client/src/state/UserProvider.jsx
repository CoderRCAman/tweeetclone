import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
const UserContext = createContext();
//REFRENCE
//Access user_info -> user_ctx.user.user_info
//        ->[uid, user_name ,feeds]
export default function UserProvider({ children }) {
  const [tweetModal , setTWeetModal] =useState(false)
  const [refresh,setRefresh] = useState(0) ; 
  const [navClicks, setNavClicks] = useState({
    home: false,
    notification: false,
    profile: false,
    logout: false,
  }); 

  useEffect(()=>{
    if(refresh)
    window.location.reload() ;
  },[refresh])


  const [User, setUser] = useState(null);
  async function getUserInfo () {
    const id = localStorage.getItem('user_id') ; 
     try {
       const user = await axios.get(`http://localhost:5000/user/${id}`) ; 
       console.log(user)
       if(user.status===200){
        setUser(user.data.user) ;
       }
     } catch (error) {
      
     }
  }
  useEffect(() => {
   getUserInfo()
  }, []);
  const state = {
    user: User,
    navClicks: navClicks,
    tweetModal: tweetModal,
    setUser: setUser,
    setNavClicks: setNavClicks,
    setTWeetModal: setTWeetModal,
    setRefresh : setRefresh //icrrement its value by 1 to refresh the useeffect to get lastest information hack
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
export { UserContext };
