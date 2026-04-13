import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading, setUser } from "@/redux/authSlice";
import { X, Loader2 } from "lucide-react";

const UpdateProfileModal = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    // Join array into a comma-separated string for easy editing
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || "",
  });

  if (!isOpen) return null;

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("bio", inputs.bio);
    formData.append("skills", inputs.skills);
    formData.append("phoneNumber", inputs.phoneNumber);

    if (inputs.file) {
      formData.append("file", inputs.file);
    }

    try {
      // FIXED: Must dispatch the setLoading action

      const response = await axios.put(
        "https://job-portel-mern-backend-harhs-foujdar.onrender.com/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully");
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Update Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={submitHandler} className="p-6 space-y-4 text-sm">
          <div className="space-y-1">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={inputs.name}
              onChange={onChangeHandler}
              name="name"
              placeholder="John Doe"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={inputs.email}
              onChange={onChangeHandler}
              name="email"
              placeholder="john@example.com"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              value={inputs.phoneNumber}
              onChange={onChangeHandler}
              name="phoneNumber"
              placeholder="+1 234 567 8900"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Bio</label>
            <textarea
              value={inputs.bio}
              onChange={onChangeHandler}
              name="bio"
              rows="3"
              placeholder="Tell us a little about yourself..."
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">
              Skills{" "}
              <span className="text-gray-400 font-normal">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              value={inputs.skills}
              onChange={onChangeHandler}
              name="skills"
              placeholder="React, Node.js, Tailwind CSS"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">
              Resume{" "}
              <span className="text-gray-400 font-normal">(PDF only)</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={fileHandler}
              name="file"
              id="file"
              className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer text-gray-600"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
