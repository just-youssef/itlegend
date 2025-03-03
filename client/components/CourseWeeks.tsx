"use client";

import { FaRegFileLines } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";

const CourseWeeks = ({ weeks }: { weeks: any[] }) => {
  return (
    <div className="flex flex-col gap-y-8">
      {weeks.map((w, wIdx) => {
        return (
          <div
            key={wIdx}
            className="flex flex-col bg-slate-50 rounded shadow p-8 "
          >
            <h1 className="text-xl font-semibold">{w.title}</h1>
            <p className="py-4">{w.description}</p>

            {w.contents.map((c: any, cIdx: number) => {
              return (
                <div
                  key={cIdx}
                  className={`flex w-full items-center gap-x-2 py-4 border-slate-300 ${
                    cIdx < w.contents.length - 1
                      ? `border-b ${cIdx == 0 ? "border-t" : ""}`
                      : ""
                  }`}
                >
                  <FaRegFileLines className="min-w-fit h-fit" />
                  <span className="">{c.statement}</span>

                  {c.type == "lesson" ? (
                    <MdLockOutline className="ml-auto min-w-fit h-fit" />
                  ) : (
                    <div className="flex justify-end gap-1 flex-wrap ml-auto">
                      <span className="bg-green-100 rounded text-green-700 uppercase text-xs p-1 min-w-fit">{c.questions} Questions</span>
                      <span className="bg-red-100 rounded text-red-700 uppercase text-xs p-1 min-w-fit">{c.durationInMinutes} Minutes</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CourseWeeks;
