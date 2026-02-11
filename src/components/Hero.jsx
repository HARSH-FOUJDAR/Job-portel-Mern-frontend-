import { Button } from "./ui/button";
import { AiOutlineSearch } from "react-icons/ai"; // Ek icon search ko professional banata hai

const Hero = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      {/* Badge Style Heading */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold tracking-wide uppercase shadow-sm">
        No. 1 Job Search Platform :)
      </div>

      {/* Main Heading with dynamic text size */}
      <h1 className="text-center text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight max-w-4xl">
        Search, Apply &{" "}
        <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Get Your Dream Job
        </span>
      </h1>

      {/* Professional Subtext */}
      <p className="mt-6 text-lg text-slate-600 text-center max-w-2xl leading-relaxed">
        Join thousands of professionals finding their next career move with
        Jobify. Top companies are waiting for your application.
      </p>

      {/* Advanced Search Bar Container */}
      <div className="w-full max-w-xl mt-10 relative flex items-center group">
        <div className="absolute left-6 text-slate-400 group-focus-within:text-orange-500 transition-colors">
          <AiOutlineSearch size={22} />
        </div>

        <input
          type="text"
          placeholder="Job title, company or keywords"
          className="w-full pl-14 pr-32 py-4 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-full outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-700 placeholder:text-slate-400"
        />

        <Button className="absolute right-2 rounded-full px-8 py-6 bg-orange-600 hover:bg-orange-700 text-white font-bold transition-transform active:scale-95 shadow-lg shadow-orange-600/20">
          Search
        </Button>
      </div>

      {/* Floating Popular Categories (Professional Addition) */}
      <div className="mt-8 flex gap-3 flex-wrap justify-center text-sm text-slate-500">
        <span className="font-medium">Trending:</span>
        <span className="hover:text-orange-600 cursor-pointer transition-colors">
          Frontend
        </span>
        <span className="hover:text-orange-600 cursor-pointer transition-colors">
          UI/UX
        </span>
        <span className="hover:text-orange-600 cursor-pointer transition-colors">
          Data Science
        </span>
      </div>
    </div>
  );
};

export default Hero;
