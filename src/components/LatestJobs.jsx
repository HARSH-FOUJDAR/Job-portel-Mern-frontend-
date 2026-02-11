import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import { motion } from "framer-motion"; // Smooth entry animations ke liye

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 md:px-8">
      {/* Section Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Latest & Top <span className="text-indigo-600">Job Openings</span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Discover your next career move from the most recent postings
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-medium text-lg">
              No Jobs Available at the moment.
            </span>
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))
        )}
      </div>

      {/* View All Button (Optional but Professional) */}
      {allJobs.length > 6 && (
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
            View All Opportunities
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
