import { setCompanies } from "@/redux/companySlice";
import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const response = await axios.get(
          "https://job-portel-mern-backend.onrender.com/job/get-admin-jobs",
          {
            withCredentials: true,
          }
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
