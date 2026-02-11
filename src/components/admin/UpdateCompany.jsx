import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Loader2, ArrowLeft } from "lucide-react"; // Modern Icons

const UpdateCompany = () => {
  const params = useParams();
  const companyId = params.id;
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // Jab page load ho, purana data fields mein bhar jaye
  useEffect(() => {
    if (singleCompany) {
      setInputs({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("website", inputs.website);
    formData.append("location", inputs.location);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:4000/api/company/update/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <form onSubmit={submitHandler}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Update Company Profile
            </h1>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={inputs.name}
                onChange={onChangeHandler}
                placeholder="e.g. Microsoft"
                className="py-6 rounded-xl border-slate-200 focus:ring-indigo-500"
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">
                Website URL
              </Label>
              <Input
                type="text"
                name="website"
                value={inputs.website}
                onChange={onChangeHandler}
                placeholder="https://company.com"
                className="py-6 rounded-xl border-slate-200 focus:ring-indigo-500"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">
                Office Location
              </Label>
              <Input
                type="text"
                name="location"
                value={inputs.location}
                onChange={onChangeHandler}
                placeholder="e.g. Hyderabad, India"
                className="py-6 rounded-xl border-slate-200 focus:ring-indigo-500"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">
                Company Logo
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer file:bg-indigo-50 file:text-indigo-700 file:border-0 file:rounded-md file:px-4 py-2"
              />
            </div>

            {/* Description - Full Width */}
            <div className="col-span-full space-y-2">
              <Label className="font-semibold text-slate-700">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={inputs.description}
                onChange={onChangeHandler}
                placeholder="Briefly describe the company culture and goals"
                className="py-6 rounded-xl border-slate-200 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-6 rounded-xl font-bold transition-all ${
                loading
                  ? "bg-slate-200"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCompany;
