import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // Redux me user token

  useEffect(() => {
    const getAllAdminJobs = async () => {
      if (!user?.token) return; // token missing → fetch skip

      try {
        const response = await axios.get(
          "https://job-portel-mern-backend.onrender.com/job/get-admin-jobs",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // <-- Direct token pass
            },
          }
        );

        if (response.data.success) {
          dispatch(setAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(
          "Error in fetching all admin jobs:",
          error.response?.data?.message || error
        );
      }
    };

    getAllAdminJobs();
  }, [dispatch, user?.token]); // dependency me token add karo

  return;
};

export default useGetAllAdminJobs;
