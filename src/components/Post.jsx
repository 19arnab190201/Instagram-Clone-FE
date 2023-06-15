import React from "react";
import "./Post.css";

import { AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";

const Post = ({ postData, size }) => {
  return (
    <div
      className='post-box'
      style={{
        maxWidth: size === "small" ? "270px" : "350px",
        width: size === "small" ? "270px" : "350px",
        height: size === "small" ? "270px" : "350px",
        maxHeight: size === "small" ? "270px" : "350px",
      }}>
      <div className='post-media'>
        <img src={`${postData.postMedia[0].secure_url}`} alt='post' />
      </div>
      {size === "small" ? (
        <></>
      ) : (
        <div className='post-meta'>
          <div className='post-meta-author'>
            <img
              src='https://randomuser.me/api/portraits/men/1.jpg'
              alt='author'
            />
            <span>Dol.Hill</span>
          </div>
          <div className='post-meta-interactions'>
            <span>
              <AiOutlineHeart
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              {postData.postLikes.length}
            </span>

            <span>
              <IoChatbubbleOutline
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />
              {postData.postComments.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
