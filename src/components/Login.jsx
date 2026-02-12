import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react"; // Professional loading spinner

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!inputs.role) {
      return toast.error("Please select a role");
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "https://job-portel-mern-backend.onrender.com/api/user/signin",
        inputs,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Login Error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-slate-100 p-8 flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">
            Please enter your details to login
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={inputs.email}
              name="email"
              onChange={onChangeHandler}
              placeholder="Your Email"
              className="focus-visible:ring-indigo-500"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={inputs.password}
              name="password"
              onChange={onChangeHandler}
              placeholder="Enter your password"
              className="focus-visible:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <RadioGroup className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="student"
                id="student"
                onClick={() => setInputs({ ...inputs, role: "student" })}
                checked={inputs.role === "student"}
              />
              <Label
                htmlFor="student"
                className="cursor-pointer font-medium text-slate-600"
              >
                Candidate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="recruiter"
                id="recruiter"
                onClick={() => setInputs({ ...inputs, role: "recruiter" })}
                checked={inputs.role === "recruiter"}
              />
              <Label
                htmlFor="recruiter"
                className="cursor-pointer font-medium text-slate-600"
              >
                Recruiter
              </Label>
            </div>
          </RadioGroup>
        </div>

        {loading ? (
          <Button
            disabled
            className="w-full bg-slate-900 text-white rounded-xl"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl py-6 transition-all shadow-lg shadow-slate-200"
          >
            Login
          </Button>
        )}

        <div className="text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up for free
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
