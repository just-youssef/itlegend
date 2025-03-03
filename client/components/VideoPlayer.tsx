"use client";

import { useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";


const VideoPlayer = ({ url }: { url: string }) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = playerRef.current;

    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      if (playerRef.current.paused) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  };

  return (
    <div className="relative rounded overflow-hidden">
      <video
        ref={playerRef}
        src={url}
        controls={isPlaying}
        className="w-full h-fit"
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 bg-black/50 flex justify-center items-center cursor-pointer"
        >
          <span className="bg-slate-50 p-5 rounded-full">
            <FaPlay className="w-5 h-5 text-2xl text-red-600" />
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
