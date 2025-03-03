"use client";
import { FaCaretDown } from "react-icons/fa6";


const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative pt-10 pb-4 text-sm text-blue-900">
      {/* user indicator */}
      <div
        className="flex flex-col absolute top-0 items-center"
        style={{ left: `calc(${percentage}% - 18px)` }}
      >
        <span className="rounded-full border-2 border-slate-300 w-8 h-8 flex items-center justify-center">
          You
        </span>

        <FaCaretDown className="text-slate-400 w-4 h-4 -mt-[2px]" />
      </div>

      {/* progress percentage */}
      <div
        className="absolute bottom-0"
        style={{ left: `calc(${percentage}% - 10px)` }}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          {percentage}%
        </span>
      </div>

      {/* actual bar */}
      <progress
        className="w-full h-2 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-green-600/80 [&::-webkit-progress-value]:rounded-full"
        value={percentage}
        max="100"
      />
    </div>
  );
};

export default ProgressBar;
