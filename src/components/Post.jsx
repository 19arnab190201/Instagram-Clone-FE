import React from "react";
import "./Post.css";

import { AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";

const Post = () => {
  return (
    <div className='post-box'>
      <div className='post-media'>
        <img src='https://picsum.photos/600' alt='post' />
      </div>
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
            2.4K
          </span>

          <span>
            <IoChatbubbleOutline
              style={{
                width: "22px",
                height: "22px",
              }}
            />
            38
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
