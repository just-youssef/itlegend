import {
  CommentsPanel,
  CourseActions,
  ProgressBar,
  VideoPlayer,
  CourseWeeks,
} from "@/client/components";
import { unstable_cacheLife } from "next/cache";
import Link from "next/link";
import {
  FaChevronRight,
  FaChevronLeft,
  FaBookOpen,
  FaComments,
  FaBookOpenReader,
} from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import { LuClock } from "react-icons/lu";
import { PiBooksLight } from "react-icons/pi";
import { notFound } from "next/navigation";

const getCourseDetails = async (id: string) => {
  "use cache";
  unstable_cacheLife({ stale: 300, revalidate: 3600, expire: Infinity });

  // this data should be fetched from backend
  const course = {
    id,
    title: "Lorem Course",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam libero quas provident, cum voluptatem deleniti debitis nemo ullam dolorem quidem iste ipsum excepturi et quos eum, autem officia, magnam perferendis!",
    completion: 70,
    videos: [
      {
        id:1,
        title: "Video 1",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      },
      {
        id: 2,
        title: "Video 2",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      },
      {
        id: 3,
        title: "Video 3",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
    weeks: [
      {
        title: "Week 1-4",
        description:
          "Advanced story telling techniques for writers: Persona, Characters & Plots.",
        contents: [
          { type: "lesson", statement: "Introduction" },
          { type: "lesson", statement: "Course Overview" },
          {
            type: "exam",
            statement: "Course Overview",
            questions: 0,
            durationInMinutes: 10,
          },
          { type: "lesson", statement: "Course Exercise / Reference Files" },
          {
            type: "lesson",
            statement: "Code Editor Installation (Optional if you have one)",
          },
          { type: "lesson", statement: "Embedding PHP in HTML" },
        ],
      },
      {
        title: "Week 5-8",
        description:
          "Advanced story telling techniques for writers: Persona, Characters & Plots.",
        contents: [
          { type: "lesson", statement: "Defining Functions" },
          { type: "lesson", statement: "Function Parameters" },
          {
            type: "exam",
            statement: "Return Values From Functions",
            questions: 2,
            durationInMinutes: 15,
          },
          { type: "lesson", statement: "Global Variable and Scope" },
          { type: "lesson", statement: "Newwer way of creating a constant" },
          { type: "lesson", statement: "Constants" },
        ],
      },
    ],
    comments: [
      {
        user:{
          name: "Comment 1 User",
          image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi praesentium officiis maiores perferendis, assumenda cumque neque. Odit qui sed iure error, explicabo porro nesciunt? Incidunt eum ipsa iusto earum.",
        createdAt: new Date()
      },
      {
        user:{
          name: "Comment 2 User",
          image: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi praesentium officiis maiores perferendis, assumenda cumque neque. Odit qui sed iure error, explicabo porro nesciunt? Incidunt eum ipsa iusto earum.",
        createdAt: new Date()
      }
    ],
    instructor: "Edward Norton",
    durationInWeeks: 3,
    lessons: 8,
    enrolled: 65,
    language: "English",
  };

  return course;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  "use cache";
  unstable_cacheLife("weeks");

  const { id } = await params;
  const { title, description } = await getCourseDetails(id);

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };

  return metadata;
};

const CoursDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video: string }>;
}) => {
  const { id } = await params;
  const course = await getCourseDetails(id);
  if (!course) return notFound();

  const { video } = await searchParams;
  const videoIdx = video ? course.videos.findIndex((v) => v.id == +video) : 0;
  if (videoIdx == -1) return notFound();

  const currentVideo = course.videos[videoIdx];
  return (
    <div className="flex flex-col flex-grow">
      {/* inner header */}
      <div className="p-4 lg:px-8 bg-slate-200 flex flex-col gap-y-4">
        {/* path */}
        <div className="flex items-center gap-x-1">
          <span>Home</span>
          <FaChevronRight className="w-3 h-3" />
          <span>Courses</span>
          <FaChevronRight className="w-3 h-3" />
          <span>{course.title}</span>
        </div>

        {/* video title */}
        <h1 className="font-bold text-4xl">{currentVideo.title}</h1>
      </div>

      {/* inner content */}
      <div className="flex-grow flex px-4 lg:px-8 gap-x-8 py-4">
        <div className="flex flex-col flex-grow gap-y-4">
          {/* video player */}
          <div className="flex max-lg:sticky max-lg:top-15 z-40">
            {videoIdx > 0 && (
              <Link
                href={`?video=${course.videos[videoIdx - 1].id}`}
                className="video-control"
              >
                <FaChevronLeft />
              </Link>
            )}
            <VideoPlayer url={currentVideo.url} />
            {videoIdx < course.videos.length - 1 && (
              <Link
                href={`?video=${course.videos[videoIdx + 1].id}`}
                className="video-control"
              >
                <FaChevronRight />
              </Link>
            )}
          </div>

          {/* actions */}
          <div className="flex gap-x-2 mt-4">
            <Link href={`#topics`} className="icon-btn">
              <FaBookOpen />
            </Link>

            <Link href={`#comments`} className="icon-btn">
              <FaComments />
            </Link>

            {/* dynamic actions */}
            <CourseActions course={course} />
          </div>

          {/* materials */}
          <div className="mt-8 flex flex-col gap-y-4">
            <h1 id="materials" className="font-semibold text-2xl">
              Course Materials
            </h1>

            <div className="flex flex-col bg-slate-50 rounded shadow p-4 lg:text-lg">
              <div className="flex justify-between max-lg:flex-col">
                <div className="flex w-full items-center gap-x-2 p-4">
                  <BsPersonBoundingBox />
                  <span>Instructor:</span>
                  <span className="ml-auto">{course.instructor}</span>
                </div>

                <div className="w-[1px] h-full max-lg:hidden bg-slate-300" />
                <div className="h-[1px] w-full lg:hidden bg-slate-300" />

                <div className="flex w-full items-center gap-x-2 p-4">
                  <LuClock />
                  <span>Duration:</span>
                  <span className="ml-auto">{course.durationInWeeks} Week</span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-slate-300" />

              <div className="flex justify-between max-lg:flex-col">
                <div className="flex w-full items-center gap-x-2 p-4">
                  <PiBooksLight />
                  <span>Lessons:</span>
                  <span className="ml-auto">{course.lessons}</span>
                </div>

                <div className="w-[1px] h-full max-lg:hidden bg-slate-300" />
                <div className="h-[1px] w-full lg:hidden bg-slate-300" />

                <div className="flex w-full items-center gap-x-2 p-4">
                  <FaBookOpenReader />
                  <span>Enrolled:</span>
                  <span className="ml-auto">{course.enrolled} Students</span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-slate-300" />

              <div className="flex w-full items-center gap-x-2 p-4">
                <MdLanguage />
                <span>Language:</span>
                <span className="ml-auto">{course.language}</span>
              </div>
            </div>
          </div>

          {/* topics (mobile only) */}
          <div className="lg:hidden flex flex-col gap-y-4 mt-8">
            <h1 id="topics" className="font-semibold text-2xl">
              Topics for this course
            </h1>

            {/* progress bar */}
            <ProgressBar percentage={course.completion} />

            {/* weeks */}
            <CourseWeeks weeks={course.weeks} />
          </div>

          {/* comments */}
          <div className="flex flex-col gap-y-4 mt-8">
            <h1 id="comments" className="font-semibold text-2xl">
              Comments
            </h1>
            <CommentsPanel comments={course.comments} />
          </div>
        </div>

        {/* topics (desktop only) */}
        <div className="max-lg:hidden flex flex-col gap-y-4 min-w-1/3">
          <h1 id="topics" className="font-semibold text-2xl">
            Topics for this course
          </h1>

          {/* progress bar */}
          <ProgressBar percentage={course.completion} />

          {/* weeks */}
          <CourseWeeks weeks={course.weeks} />
        </div>
      </div>
    </div>
  );
};

export default CoursDetails;
