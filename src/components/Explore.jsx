import { useSelector } from "react-redux";
import Job from "./Job";
import { motion, AnimatePresence } from "framer-motion";

const Explore = () => {
  // Redux store se filtered jobs uthana professional approach hai
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Search Results
          <span className="ml-2 text-indigo-600">({allJobs.length})</span>
        </h1>
        {searchedQuery && (
          <p className="text-slate-500 mt-2">
            Showing results for{" "}
            <span className="font-semibold text-slate-700">
              "{searchedQuery}"
            </span>
          </p>
        )}
      </header>

      {allJobs.length <= 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-10">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-formats--empty-state-search-not-results-business-pack-illustrations-5341619.png"
            alt="No results"
            className="w-48 h-48 opacity-60 mb-4"
          />
          <h3 className="text-xl font-bold text-slate-800">No Jobs Found</h3>
          <p className="text-slate-500">
            Try searching with different keywords or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {allJobs.map((job) => (
              <motion.div
                key={job?._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Explore;
