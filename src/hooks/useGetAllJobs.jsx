import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // Redux me token

  useEffect(() => {
    const getAllJobs = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token) return; // no token → don’t fetch

      try {
        const response = await axios.get(
          "https://job-portel-mern-backend.onrender.com/api/job/get/",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // <-- Direct token pass
            },
          },
        );

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(
          "Error in fetching all jobs:",
          error.response?.data?.message || error,
        );
      }
    };

    getAllJobs();
  }, [dispatch, user?.token]); // token dependency add karo

  return;
};

export default useGetAllJobs;
