import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar"; // Logo ke liye
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/job/description/${job?._id}`)}
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer group"
    >
      {/* Top Header: Company Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-slate-100 p-1">
            <AvatarImage
              src={job?.company?.logo}
              alt="Company Logo"
              className="object-contain"
            />
          </Avatar>
          <div>
            <h1 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
              {job?.company?.name}
            </h1>
            <p className="text-xl font-medium text-slate-800 uppercase tracking-wider">
              <FaLocationDot className="inline  text-md" /> {job?.location}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-blue-600 border-blue-100 bg-blue-50 font-semibold px-3 py-1"
        >
          New
        </Badge>
      </div>

      {/* Center Content: Title & Description */}
      <div className="mt-5">
        <h2 className="text-xl font-bold text-slate-800 line-clamp-1">
          {job?.title}
        </h2>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Bottom Metadata: Salary & Type */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 rounded-full font-bold">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none px-3 py-1 rounded-full font-bold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none px-3 py-1 rounded-full font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;
