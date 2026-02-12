import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FilterJob from "./FilterJob";
import Job from "./Job";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  // Filtering Logic: Search query ke base par data update karna
  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.company?.name.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        {/* Sidebar Filter - Glassmorphism touch */}
        <aside className="w-full md:w-[250px] lg:w-[300px] shrink-0">
          <div className="sticky top-24">
            <FilterJob />
          </div>
        </aside>

        {/* Jobs Feed Section */}
        <main className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Available Jobs ({filterJobs.length})
            </h2>
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7228661.png"
                alt="No jobs"
                className="w-48 h-48 mb-4 opacity-60"
              />
              <h3 className="text-2xl font-bold text-slate-900">
                No matching jobs
              </h3>
              <p className="text-slate-500 mt-2 max-w-sm">
                We couldn't find any jobs matching your current filters. Try
                resetting them or search for something else.
              </p>
            </div>
          ) : (
            <div className="h-[82vh] overflow-y-auto pb-10 no-scrollbar pr-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      layout /* Auto-layout for smooth filtering */
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;
