import React from "react";

const bars = [250, 715, 475, 25, 190]; // delays in ms

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <div className="flex items-end justify-center w-[100px] min-w-[100px] h-[50px] overflow-hidden relative z-10">
        {bars.map((delay, i) => (
          <div
            key={i}
            className="w-[10px] h-[5px] mx-[2px] bg-[#282828] animate-dance"
            style={{
              animationDelay: `${delay}ms`,
              animation: `dance 1s ease-in-out infinite ${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
