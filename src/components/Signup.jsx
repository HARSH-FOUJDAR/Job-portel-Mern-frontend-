import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react"; // Spinner icon

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    file: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInputs({ ...inputs, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic Client-side Validation
    if (!inputs.role)
      return toast.error("Please select a role (Student or Recruiter)");

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("role", inputs.role);
    formData.append("phoneNumber", inputs.phoneNumber);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "https://job-portel-mern-backend.onrender.com/api/user/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error("Signup error", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl bg-white shadow-2xl rounded-2xl border  mx-auto border-slate-200 p-10 flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-slate-900">Join Jobify</h1>
          <p className="text-slate-500 mt-1">
            Create your professional account today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={onChangeHandler}
              placeholder="Your Name"
              className="focus-visible:ring-indigo-500 border border-gray-700 py-2 px-5  rounded-xl"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={onChangeHandler}
              placeholder="Your Email"
              className="focus-visible:ring-indigo-500 border border-gray-700 py-2 px-5  rounded-xl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <input
              type="number"
              name="phoneNumber"
              value={inputs.phoneNumber}
              onChange={onChangeHandler}
              placeholder="Mobile Number"
              className="focus-visible:ring-indigo-500 border border-gray-700 py-2 px-5  rounded-xl"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={onChangeHandler}
              placeholder="Create a Password"
              className="focus-visible:ring-indigo-500 border border-gray-700 py-2 px-5  rounded-xl"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
          <RadioGroup className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="student"
                id="r1"
                onClick={() => setInputs({ ...inputs, role: "student" })}
                checked={inputs.role === "student"}
              />
              <Label
                htmlFor="r1"
                className="cursor-pointer font-medium text-slate-700"
              >
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="recruiter"
                id="r2"
                onClick={() => setInputs({ ...inputs, role: "recruiter" })}
                checked={inputs.role === "recruiter"}
              />
              <Label
                htmlFor="r2"
                className="cursor-pointer font-medium text-slate-700"
              >
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="w-full md:w-auto">
            <Label className="block mb-1.5">Profile Photo</Label>
            <input
              accept="image/*"
              onChange={fileHandler}
              type="file"
              className="cursor-pointer file:bg-indigo-50 file:text-indigo-700 file:border-0 file:rounded-md file:px-2  border border-gray-700 py-2 rounded-xl"
            />
          </div>
        </div>

        {loading ? (
          <Button disabled className="w-full bg-slate-900 text-white py-6">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-6 rounded-xl transition-all shadow-lg"
          >
            Sign Up
          </Button>
        )}

        <div className="text-center text-sm">
          <span className="text-slate-500">Already have an account? </span>
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:underline"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
