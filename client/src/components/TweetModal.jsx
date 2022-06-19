import Modal from "react-responsive-modal";
import React, { useState,useContext,useRef } from "react";
import { UserContext } from "../state/UserProvider";
import { CloseOutlined,PictureOutlined,CloseCircleFilled  } from "@ant-design/icons";

import toast, { Toaster } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import shortid from "shortid";
export default function TweetModal() { 
  const [uploadFile, uploading, snapshot, up_error] = useUploadFile();
  const fileRef = useRef(null) ;
    const [showFull,setShowFull] = useState(false);
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (!uploadPost.content && !uploadPost.picture) return;
    //     let downloadURL = "";
    //     if (uploadPost.picture) {
    //       const randKey = shortid.generate();
    //       const storageRef = ref(
    //         storage,
    //         `Images/${uploadPost.picture.name + randKey}`
    //       );
    //       try {
    //         const result = await uploadFile(storageRef, uploadPost.picture, {
    //           contentType: "image/jpeg",
    //         });
    //         if (result) {
    //            downloadURL = await getDownloadURL(storageRef);
    //           console.log(downloadURL);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //         toast.error("Unable to post tweet right now!");
    //       }
    //     }
    //     try {
    //       const tweetRef = collection(db, "tweet");
    //       const tweetRes =  await addDoc(tweetRef, {
    //         picture: downloadURL,
    //         content: uploadPost.content,
    //       });
    //       console.log(tweetRes) 
    //       const postedTweets = user_ctx.user.user_info?.tweets ? user_ctx.user.user_info.tweets : [] ; 
    //       postedTweets.push(tweetRes.id) ;
    //       const userDoc = doc(db,'user',user_ctx.user.user_info.id) ;  
    //       await updateDoc(userDoc , {
    //           tweets: postedTweets
    //       })
    //       toast.success('TWEETED!');
    //     } catch (error) {
    //       console.log(error);
    //       toast.error("Unable to post tweet right now!");
    //     }
    //     user_ctx.setRefresh(refresh => refresh+1)
    //     user_ctx.setTWeetModal(false) ;
    //   };
    const [uploadPost,setUploadPost] = useState({
        picture : null ,
        content : ''
    })
    const user_ctx = useContext(UserContext) ;
  return (
    <Modal
      open={user_ctx?.tweetModal}
      onClose={() => user_ctx.setTWeetModal(false)}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      closeIcon={
        <span className="hover:bg-gray-800 h-10 w-10 rounded-full pt-1">
          <CloseOutlined className="text-white " />
        </span>
      }
    >
        <Toaster/>
      <div className="mt-10">

      <form onSubmit={handleSubmit}>
        <div className="flex  space-x-3  ">
          <img
            src={user_ctx.user.user?.photoURL}
            alt=""
            className="h-12 w-12 rounded-full "
          />

          <div
            className={`w-full border-b-${
              showFull ? "[1px]" : "none"
            } border-b-gray-700 pb-5`}
          >
            <TextareaAutosize
              onClick={() => setShowFull(true)}
              onChange={(e) =>
                setUploadPost({ ...uploadPost, content: e.target.value })
              }
              className="bg-black text-white resize-none font-[Roboto] text-xl md:w-[70%] outline-none mt-2"
              placeholder="What's happening?"
            />
            {uploadPost.picture && (
              <div className="relative">
                <CloseCircleFilled
                  className="absolute text-2xl left-2 text-slate-800 hover:text-slate-700 cursor-pointer"
                  onClick={() =>
                    setUploadPost({ ...uploadPost, picture: null })
                  }
                />
                <img
                  src={URL.createObjectURL(uploadPost.picture)}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`ml-16 ${
            showFull ? "mt-3" : "-mt-3"
          } flex items-center justify-between`}
        >
          <div
            className="hover:bg-sky-600 hover:bg-opacity-25 h-9 w-9 rounded-full text-center cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            <PictureOutlined className="text-sky-600 text-xl" />
          </div>
          <button
            disabled={!uploadPost.content && !uploadPost.picture}
            className={`bg-[#1D9BF0] ${
              !uploadPost.content && !uploadPost.picture
                ? "opacity-50"
                : "opacity-100"
            } px-6 py-2 text-md font-bold text-white rounded-full`}
          >
            Tweet
          </button>
        </div>

        <input
          onChange={(e) =>
            setUploadPost({ ...uploadPost, picture: e.target.files[0] })
          }
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          ref={fileRef}
        />
      </form>
      </div>
    </Modal>
  );
}
