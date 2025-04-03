import React from "react";

function TimeRangeButtons({ timeRange, setTimeRange, isChangingTimeRange }) {
  const timeRangeButtons = [
    { name: "All Time", value: "long_term" },
    { name: "Last 6 Months", value: "medium_term" },
    { name: "Last 4 Weeks", value: "short_term" },
  ];

  return (
    <div className="flex gap-[10px]">
      {timeRangeButtons.map(({ name, value }) => (
        <button
          key={value}
          className={`px-[24px] py-[11px] text-[12px] font-bold tracking-[1px] uppercase rounded-[30px] cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] ${
            timeRange === value
              ? "bg-white text-black"
              : "text-white border border-white hover:bg-white hover:text-black"
          }`}
          onClick={() => setTimeRange(value)}
          disabled={isChangingTimeRange}
        >
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

export default TimeRangeButtons;
