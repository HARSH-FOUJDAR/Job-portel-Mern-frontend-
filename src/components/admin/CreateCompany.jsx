import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Loader2 } from "lucide-react";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a company");
      return;
    }
    e.preventDefault();
    if (!name.trim()) return toast.error("Company name is required");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://job-portel-mern-backend.onrender.com/api/company/register",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        const companyId = response.data.company._id;
        navigate(`/admin/update/company/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log("error in creating company", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <div className="my-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Setup Your Company
        </h1>
        <p className="text-slate-500 mt-2">
          What would you like to give your company name? You can change this
          later.
        </p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 md:p-12">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-slate-700"
            >
              Company Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" Company Name"
              className="py-6 rounded-xl border-slate-200 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="px-8 py-6 rounded-xl font-bold border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </Button>

            <Button
              onClick={submitHandler}
              disabled={loading || !name.trim()}
              className={`px-8 py-6 rounded-xl font-bold transition-all ${
                loading
                  ? "bg-slate-200"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
