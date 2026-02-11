import store from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading, setUser } from "@/redux/authSlice";
const UpdateProfileModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
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
      setLoading(true);
      const response = await axios.put(
        "http://localhost:4000/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log("eeror in update profile", error);
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={submitHandler}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
          <input
            type="text"
            value={inputs.name}
            onChange={onChangeHandler}
            name="name"
            placeholder="Enter your name"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="email"
            value={inputs.email}
            onChange={onChangeHandler}
            name="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="number"
            value={inputs.phoneNumber}
            onChange={onChangeHandler}
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            value={inputs.bio}
            onChange={onChangeHandler}
            name="bio"
            placeholder="Enter your Bio"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            value={inputs.skills}
            onChange={onChangeHandler}
            name="skills"
            placeholder="Enter your Skills"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={fileHandler}
            name="file"
            id="file"
            placeholder="Upload resume"
            className="w-full border p-2 rounded mb-3"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
