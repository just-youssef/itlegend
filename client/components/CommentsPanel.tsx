"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

const CommentsPanel = ({ comments }: { comments: any[] }) => {
  const [commentsList, setCommentsList] = useState(comments);

  const CommentForm = () => {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleAddComment = (e: any) => {
      e.preventDefault();

      // validate comment not empty
      if (!comment) {
        setError("This field is required!");

        return;
      }

      // add comment logic
      setCommentsList((prev) => {
        const next = [...prev];
        next.unshift({
          user: {
            name: "Me",
            image:
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          content: comment,
          createdAt: new Date(),
        });

        return next;
      });
      // finally clear state, session storage & close modal
      setComment("");
    };

    return (
      <form
        onSubmit={handleAddComment}
        className="flex flex-col justify-center gap-y-4"
      >
        <div className="flex flex-col">
          <textarea
            value={comment}
            onChange={(e) => {
              const inputComment = e.target.value;

              setComment(inputComment);
              setError("");
            }}
            className="rounded bg-slate-50 shadow p-4 min-h-[150px]"
            placeholder="Write a comment.."
          />
          {error && (
            <small className="text-red-600 flex items-center gap-1">
              <MdErrorOutline /> {error}
            </small>
          )}
        </div>

        <button disabled={Boolean(error)} className="review-btn">
          <span>Add Comment</span>
          <FaArrowRight />
        </button>
      </form>
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col p-8 gap-y-4 bg-slate-50 shadow rounded">
        {commentsList.map((c, cIdx) => (
          <Fragment key={cIdx}>
            <div className="flex gap-x-4">
              <Image
                src={c.user.image}
                width={100}
                height={100}
                alt={`${c.user.name} profile`}
                className="rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] object-cover shadow"
              />

              <div className="flex flex-col gap-y-1 text-slate-500">
                <h2 className="font-semibold text-lg">{c.user.name}</h2>
                <span className="text-sm italic">
                  {c.createdAt.toDateString()}
                </span>

                <p className="mt-2">{c.content}</p>
              </div>
            </div>

            {cIdx < commentsList.length - 1 && (
              <div className="bg-slate-300 h-[1px]" />
            )}
          </Fragment>
        ))}
      </div>
      <CommentForm />
    </div>
  );
};

export default CommentsPanel;
