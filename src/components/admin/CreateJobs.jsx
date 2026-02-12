import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";
import { Loader2 } from "lucide-react"; // Professional spinner

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateJobs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInputs({ ...inputs, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to post a job");
      return;
    }
    e.preventDefault();
    if (!inputs.companyId) return toast.error("Please select a company first");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://job-portel-mern-backend.onrender.com/api/job/post",
        inputs,
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },  
          withCredentials: true,
        },
      );
      if (response.data.success) {

        toast.success(response.data.message);
        navigate(`/admin/jobs`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Post New Opportunity
          </h1>
          <p className="text-slate-500 mt-1">
            Fill in the details to list a new job on your platform.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/jobs")}>
          Back
        </Button>
      </div>

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-semibold">Job Title</Label>
            <Input
              name="title"
              value={inputs.title}
              onChange={onChangeHandler}
              placeholder="e.g. Senior Frontend Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Location</Label>
            <Input
              name="location"
              value={inputs.location}
              onChange={onChangeHandler}
              placeholder="e.g. Remote, Mumbai"
              required
            />
          </div>

          <div className="col-span-full space-y-2">
            <Label className="font-semibold">Description</Label>
            <Input
              name="description"
              value={inputs.description}
              onChange={onChangeHandler}
              placeholder="Detailed job overview..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Salary (LPA)</Label>
            <Input
              type="number"
              name="salary"
              value={inputs.salary}
              onChange={onChangeHandler}
              placeholder="e.g. 12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Experience Level (Years)</Label>
            <Input
              name="experienceLevel"
              value={inputs.experienceLevel}
              onChange={onChangeHandler}
              placeholder="e.g. 2-5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Job Type</Label>
            <Input
              name="jobType"
              value={inputs.jobType}
              onChange={onChangeHandler}
              placeholder="e.g. Full-time, Internship"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">No. of Positions</Label>
            <Input
              type="number"
              name="position"
              value={inputs.position}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="col-span-full space-y-2">
            <Label className="font-semibold">Requirements (Skills)</Label>
            <Input
              name="requirements"
              value={inputs.requirements}
              onChange={onChangeHandler}
              placeholder="React, Node.js, Tailwind..."
              required
            />
          </div>

          <div className="col-span-full space-y-2 pt-4 border-t border-slate-100">
            <Label className="font-bold text-indigo-600">
              Selecting Partner Company
            </Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Which company is hiring?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies?.length > 0 ? (
                    companies.map((company) => (
                      <SelectItem
                        key={company?._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-red-500">
                      Please register a company first
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-1/2 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </>
            ) : (
              "Post Job"
            )}
          </Button>
          {companies.length === 0 && (
            <p className="text-sm text-red-500 mt-4 animate-pulse">
              * Note: You must register a company before posting a job.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateJobs;
