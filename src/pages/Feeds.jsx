import React, { useState, useEffect } from "react";
import StoriesContainer from "../components/StoriesContainer";
import PostsContainer from "../components/PostsContainer";
import "./Feeds.css";
import useAxios from "../hooks/useAxios";
import { useAuthContext } from "../hooks/useAuthContext";

const Feeds = () => {
  const { user } = useAuthContext();
  const [reload, setReload] = useState(false);

  const { response, loading, error } = useAxios(
    {
      method: "get",
      url: `api/v1/post/userposts/${user?._id}`,
      headers: JSON.stringify({ accept: "*/*" }),
    },
    reload
  );

  useEffect(() => {
    console.log("response", response);
    console.log("loading", loading);
    console.log("error", error);
  }, [response, loading, error]);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
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
          <PostsContainer posts={!loading ? response?.posts : []} />
        </div>
      </div>
    );
  }
};

export default Feeds;
