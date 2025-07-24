import React, { useEffect, useRef, useState } from "react";

const images = [
  "./banner1.jpg",
  "./banner2.jpg",
  "./banner3.jpg",
  "./banner4.jpg",
];

function HomeCarousel() {
  const intervalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    sliderStart();
    return () => clearInterval(intervalRef.current);
  }, []);

  function sliderStart() {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  }
  function handlePrev() {
    const imglength = images.length;
    setCurrentIndex((prev) => (prev === 0 ? imglength - 1 : prev - 1));
  }

  function handleNext() {
    const imglength = images.length;
    setCurrentIndex((prev) => (prev === imglength - 1 ? 0 : prev + 1));
  }

  function handleClick(val) {
    clearInterval(intervalRef.current);

    setCurrentIndex(val);
    sliderStart();
  }

  return (
    <>
      <div className="w-full max-h-[500px] overflow-hidden  relative">
        <div
          className="flex w-full h-full transition-transform  ease-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              src={img}
              key={index}
              className="w-full h-auto object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center mt-2.5 gap-1">
        {images.map((img, idx) => {
          return (
            <div
              onClick={() => handleClick(idx)}
              key={idx}
              className={`cursor-pointer w-2 h-2 ${
                currentIndex === idx ? "bg-black" : "bg-zinc-400 "
              } rounded-full `}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default HomeCarousel;
