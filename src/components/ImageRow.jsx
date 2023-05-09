import React from "react";
import "./ImageRow.css";

const ImageRow = () => {
  // Define an array of random image URLs
  const imageUrls1 = Array.from(
    { length: 30 },
    () => `https://picsum.photos/400?random=${Math.random()}`
  );
  const imageUrls2 = Array.from(
    { length: 30 },
    () => `https://picsum.photos/400?random=${Math.random()}`
  );
  const imageUrls3 = Array.from(
    { length: 30 },
    () => `https://picsum.photos/400?random=${Math.random()}`
  );
  const imageUrls4 = Array.from(
    { length: 30 },
    () => `https://picsum.photos/400?random=${Math.random()}`
  );

  return (
    <div
      className='image-row-container'
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}>
      <div class='slider'>
        <div class='slide-track track-1'>
          {imageUrls1.map((e, i) => (
            <div class={`slide ${i % 2 == 0 ? "slide-rounded" : ""}`}>
              <img src={e} height='100' width='100' alt='' />
            </div>
          ))}
        </div>
      </div>
      <div class='slider'>
        <div class='slide-track track-2'>
          {imageUrls2.map((e, i) => (
            <div class={`slide ${i % 2 == 0 ? "slide-rounded" : ""}`}>
              <img src={e} height='100' width='100' alt='' />
            </div>
          ))}
        </div>
      </div>
      <div class='slider'>
        <div class='slide-track track-3'>
          {imageUrls3.map((e, i) => (
            <div class={`slide ${i % 2 == 0 ? "slide-rounded" : ""}`}>
              <img src={e} height='100' width='100' alt='' />
            </div>
          ))}
        </div>
      </div>
      {/* <div class='slider'>
        <div class='slide-track track-4'>
          {imageUrls4.map((e, i) => (
            <div class={`slide ${i % 2 == 0 ? "slide-rounded" : ""}`}>
              <img src={e} height='100' width='100' alt='' />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ImageRow;
