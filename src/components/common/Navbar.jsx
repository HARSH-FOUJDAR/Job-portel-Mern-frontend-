import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { LogOut, User as UserIcon } from "lucide-react"; // Icons for professional look

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://job-portel-mern-backend.onrender.com/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-16">
        {/* Left Section: Branding */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-orange-600">ify</span>
          </h1>
        </Link>

        {/* Middle Section: Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <ul className="flex items-center gap-6">
            {user?.role === "recruiter" ? (
              <>
                <li className="hover:text-orange-600 transition-colors cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-orange-600 transition-colors cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-orange-600 transition-colors cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-orange-600 transition-colors cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-orange-600 transition-colors cursor-pointer">
                  <Link to="/explore">Explore</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Section: Auth Action */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-orange-600 hover:bg-orange-700 rounded-2xl text-white"
                  variant="solid"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-transparent hover:border-orange-500 transition-all">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 mt-2 shadow-xl border-slate-100">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-slate-100">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-bold text-slate-900 leading-tight">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="flex flex-col gap-1">
                    {user?.role === "student" && (
                      <Link to="/profile" className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                        >
                          <UserIcon size={16} /> Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
