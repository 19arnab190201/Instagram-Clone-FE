import React from "react";
import Story from "./Story";
import "./StoriesContainer.css";

const StoriesContainer = () => {
  return (
    <div className='stories-container'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(
        (e, i) => (
          <Story />
        )
      )}
    </div>
  );
};

export default StoriesContainer;
