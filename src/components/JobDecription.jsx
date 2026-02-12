import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "react-toastify";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  // Initial check for application status
  const isInitialApplied =
    singleJob?.application?.some((item) => item.applicant === user?._id) ||
    false;

  const [isApplied, setIsApplied] = useState(isInitialApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!token) return; // agar token missing, fetch na karo

      try {
        const response = await axios.get(
          `https://job-portel-mern-backend.onrender.com/api/job/get-single/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));

          // Application status sync
          setIsApplied(
            response.data.job.application.some(
              (item) => item.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.error(
          "Error fetching job details:",
          error.response?.data?.message || error,
        );
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id, token]); // token dependency add karo

  const handleJobApply = async () => {
    const token = user?.token || localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to apply for job");
      return;
    }

    try {
      const response = await axios.post(
        `https://job-portel-mern-backend.onrender.com/api/application/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Apply Job Error:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-6 border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {singleJob?.title}
          </h1>
          <div className="flex gap-3 mt-4">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 font-bold px-3 py-1"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 font-bold px-3 py-1"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 font-bold px-3 py-1"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          onClick={handleJobApply}
          className={`px-8 py-6 rounded-full font-bold transition-all duration-300 ${
            isApplied
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
          }`}
        >
          {isApplied ? "Applied Successfully" : "Apply Now"}
        </Button>
      </div>

      {/* Details Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mb-6">
          Job Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <DetailItem label="Role" value={singleJob?.title} />
          <DetailItem label="Location" value={singleJob?.location} />
          <DetailItem
            label="Experience"
            value={`${singleJob?.experienceLevel} Years`}
          />
          <DetailItem label="Salary" value={`${singleJob?.salary} LPA`} />
          <DetailItem
            label="Total Applicants"
            value={singleJob?.application?.length}
          />
          <DetailItem
            label="Posted Date"
            value={singleJob?.createdAt?.split("T")[0]}
          />
        </div>

        <div className="mt-12 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mb-4">
            Job Description
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
            {singleJob?.description || "Detailed description not available."}
          </p>
        </div>
      </div>
    </div>
  );
};


const DetailItem = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <span className="font-bold text-slate-800 min-w-[150px]">{label}:</span>
    <span className="text-slate-600 font-medium">{value || "N/A"}</span>
  </div>
);

export default JobDescription;
