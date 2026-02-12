import { setCompanies } from "@/redux/companySlice";
import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllAdminJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; 
      try {
        const response = await axios.get(
          "https://job-portel-mern-backend.onrender.com/api/job/get-admin-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
        if (response.data.success) {
          dispatch(setAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.log("error in fecthing all jobs", error);
      }
    };
    getAllAdminJobs();
  }, []);
  return;
};
export default useGetAllAdminJobs;
