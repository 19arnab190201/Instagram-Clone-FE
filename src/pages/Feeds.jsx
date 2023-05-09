import React from "react";
import StoriesContainer from "../components/StoriesContainer";
import PostsContainer from "../components/PostsContainer";
import "./Feeds.css";

const Feeds = () => {
  return (
    <div>
      <h1
        style={{
          fontWeight: 500,
        }}>
        Stories
      </h1>
      <div className='feed-stories-container'>
        <StoriesContainer />
      </div>
      <h1
        style={{
          fontWeight: 500,
          margin: "1rem 0",
        }}>
        Feed
      </h1>
      <div className='feed-posts-container'>
        <PostsContainer />
      </div>
    </div>
  );
};

export default Feeds;
