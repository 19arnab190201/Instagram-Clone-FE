import React from "react";
import Post from "./Post";
import "./PostsContainer.css";
const PostsContainer = ({ posts, size }) => {
  return (
    <div className='post-main-container'>
      {posts?.map((data, i) => (
        <Post key={data._id} size={size} postData={data} />
      ))}
    </div>
  );
};

export default PostsContainer;
