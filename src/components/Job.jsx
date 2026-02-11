import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar"; // Shadcn Avatar use karein for better look
import { Bookmark } from "lucide-react"; // Save icon ke liye

const Job = ({ job }) => {
  const navigate = useNavigate();

  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    return days;
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
      {/* Top Header: Date and Save Icon */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">
          {dayAgo(job?.createdAt) === 0
            ? "Posted Today"
            : `${dayAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-4">
        <div className="p-1 border border-slate-100 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={job?.company?.logo} className="object-contain" />
          </Avatar>
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-800 leading-tight">
            {job?.company?.name}
          </h2>
          <p className="text-slate-500 text-xs font-medium">{job?.location}</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="space-y-2">
        <h1 className="text-xl font-extrabold text-slate-900">{job?.title}</h1>
        <p className="text-sm text-slate-500 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge
          variant="secondary"
          className="bg-indigo-50 text-indigo-700 font-bold border-none"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          variant="secondary"
          className="bg-orange-50 text-orange-700 font-bold border-none"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-700 font-bold border-none"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          onClick={() => navigate(`/job/description/${job?._id}`)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-5 transition-all"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl py-5 font-bold"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
