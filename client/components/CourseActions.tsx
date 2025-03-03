"use client";

import { Fragment, useEffect, useState } from "react";
import { FaQuestion, FaArrowRight } from "react-icons/fa6";
import { MdErrorOutline, MdLeaderboard } from "react-icons/md";
import CustomModal from "./CustomModal";

const CourseActions = ({ course }: { course: any }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const [modal, setModal] = useState<{
    open: boolean;
    mode?: string;
    className?: string;
  }>({ open: false });

  const openModal = (params: any) => {
    setModal({ open: true, ...params });
  };

  const closeModal = () => {
    setModal({ open: false });
  };

  const handleAskQuestion = (e: any) => {
    e.preventDefault();

    // validate question not empty
    if (!question) {
      setError("This field is required!");

      return;
    }

    // ask question logic

    // finally clear state, session storage & close modal
    sessionStorage.removeItem(`${course.id}-question`);
    setQuestion("");
    closeModal();
  };

  useEffect(() => {
    if (modal.mode == "question") {
      const sessionQuestion = sessionStorage.getItem(`${course.id}-question`);
      if (sessionQuestion) {
        setQuestion(sessionQuestion);
      }
    }
  }, [course.id, modal.mode]);

  return (
    <Fragment>
      <button
        onClick={() => {
          openModal({ mode: "question", className: "max-w-4xl min-h-[50vh]" });
        }}
        className="icon-btn"
        name="ask question"
      >
        <FaQuestion />
      </button>

      <button
        onClick={() => {
          openModal({
            mode: "leaderboard",
            className: "max-w-xl min-h-fit",
          });
        }}
        className="icon-btn"
        name="leaderboard"
      >
        <MdLeaderboard />
      </button>

      <CustomModal
        open={modal.open}
        onClose={closeModal}
        className={modal.className}
      >
        {modal.mode == "leaderboard" && (
          <div
            dir="rtl"
            className="flex-grow flex flex-col items-center gap-y-4 p-8 text-blue-900"
          >
            <h1 className="text-2xl font-semibold">{course.title}</h1>

            <div className="flex items-center gap-x-4 bg-slate-100 rounded p-8 shadow">
              <span className="text-5xl">💪</span>
              <p>
                عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة..
                كمّل عايز أشوف اسمك في الليدر بورد هنا
              </p>
            </div>

            <div className="flex flex-col bg-slate-100 p-8 gap-y-4 rounded-4xl">
              {new Array(3)
                .fill(
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque pariatur dolore corporis magni consequuntur minima. Neque fugit rerum eos obcaecati, dolores aliquam unde soluta sunt consequatur quia quam debitis excepturi?"
                )
                .map((w, wIdx) => (
                  <p
                    className="bg-slate-50 rounded-lg border border-slate-200 shadow p-4"
                    key={wIdx}
                  >
                    {w}
                  </p>
                ))}
            </div>
          </div>
        )}

        {modal.mode == "question" && (
          <form
            onSubmit={handleAskQuestion}
            className="flex-grow flex flex-col justify-center p-8 gap-y-4 bg-slate-100"
          >
            <h1 className="text-2xl font-semibold">Ask a Question?</h1>

            <div className="flex-grow flex flex-col">
              <textarea
                value={question}
                onChange={(e) => {
                  const inputQuestion = e.target.value;

                  setQuestion(inputQuestion);
                  sessionStorage.setItem(
                    `${course.id}-question`,
                    inputQuestion
                  );
                  setError("");
                }}
                className="rounded bg-slate-50 shadow p-4 flex-grow"
                placeholder="Ask a question.."
              />
              {error && (
                <small className="text-red-600 flex items-center gap-1">
                  <MdErrorOutline /> {error}
                </small>
              )}
            </div>

            <button disabled={Boolean(error)} className="review-btn">
              <span>Submit Review</span>
              <FaArrowRight />
            </button>
          </form>
        )}
      </CustomModal>
    </Fragment>
  );
};

export default CourseActions;
