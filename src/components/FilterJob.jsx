import React from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Delhi", "USA", "UK", "Canada", "Australia"],
  },
  {
    filterType: "Industry",
    array: ["Web", "Flutter", "React", "Full Stack", "Laravel", "Nextjs"],
  },
  {
    filterType: "Salary",
    array: ["20-50k", "50-100k", "100-150k", "150-200k"],
  },
];

const FilterJob = () => {
  return (
    <div className="w-full bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl text-slate-900">Filter Jobs</h1>
        <button className="text-sm text-primary hover:underline font-medium">
          Clear All
        </button>
      </div>
      <hr className="mb-5 border-slate-100" />

      <RadioGroup>
        <div className="space-y-6">
          {filterData.map((data, index) => (
            <div key={index} className="space-y-3">
              <h2 className="font-semibold text-md text-slate-800 tracking-tight">
                {data.filterType}
              </h2>
              <div className="grid gap-2">
                {data.array.map((item, idx) => {
                  const itemId = `id-${index}-${idx}`;
                  return (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 space-y-0 cursor-pointer group"
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="border-slate-300 text-primary focus:ring-primary"
                      />
                      <Label
                        htmlFor={itemId}
                        className="text-sm font-medium leading-none cursor-pointer text-slate-600 group-hover:text-primary transition-colors"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default FilterJob;
