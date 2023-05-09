import React from "react";
import Post from "./Post";
import "./PostsContainer.css";
const PostsContainer = () => {
  return (
    <div className='post-main-container'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => (
        <Post />
      ))}
    </div>
  );
};

export default PostsContainer;
