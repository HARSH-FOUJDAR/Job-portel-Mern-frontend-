import { Button } from "./ui/button";
import { AiOutlineSearch } from "react-icons/ai";

const Hero = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[40vw] min-h-[80vh] flex items-center justify-center">
      <img
        src="https://www.bentley.edu/sites/default/files/2019-04/Bentley_111318_2396.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.45] "
      />

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center justify-center">
        <div className="mb-6 px-5 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-xs md:text-sm font-bold tracking-widest uppercase">
          No. 1 Job Search Platform
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] max-w-5xl">
          Search, Apply &{" "}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Get Your Dream Job
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
          Join thousands of professionals finding their next career move with
          Jobify. Top companies are waiting for your application.
        </p>

        <div className="w-full max-w-2xl mt-12 relative flex items-center group">
          <div className="absolute left-6 text-slate-400 group-focus-within:text-orange-500 transition-colors z-20">
            <AiOutlineSearch size={26} />
          </div>

          <input
            type="text"
            placeholder="Job title, company or keywords..."
            className="w-full pl-16 pr-36 py-5 bg-white/95 backdrop-blur-sm border-none shadow-2xl rounded-full outline-none focus:ring-4 focus:ring-orange-500/30 transition-all text-slate-800 text-lg placeholder:text-slate-500"
          />

          <Button className="absolute right-2.5 rounded-full px-10 py-7 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg transition-all active:scale-95 shadow-xl border-none">
            Search
          </Button>
        </div>

        <div className="mt-10 flex gap-4 flex-wrap justify-center items-center text-sm text-slate-300">
          <span className="font-semibold text-white uppercase tracking-wider">
            Trending:
          </span>
          {["Frontend", "UI/UX", "Data Science", "Marketing"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 rounded-full border border-white/20 hover:border-orange-400 hover:text-orange-400 cursor-pointer transition-all bg-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
