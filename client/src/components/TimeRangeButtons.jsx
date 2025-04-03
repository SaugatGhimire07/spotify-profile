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
        <a
          key={value}
          href="#"
          className={`text-[12px] uppercase tracking-[1px] border border-white px-[30px] py-[12px] rounded-[30px] transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] ${
            timeRange === value
              ? "bg-white text-black border-white"
              : "text-white border-white hover:bg-white hover:text-black"
          } ${isChangingTimeRange ? "opacity-50 pointer-events-none" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (!isChangingTimeRange) {
              setTimeRange(value);
            }
          }}
          aria-disabled={isChangingTimeRange}
        >
          <span>{name}</span>
        </a>
      ))}
    </div>
  );
}

export default TimeRangeButtons;
