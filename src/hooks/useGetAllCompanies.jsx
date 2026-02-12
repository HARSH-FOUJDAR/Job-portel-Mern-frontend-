import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // Redux me token stored

  useEffect(() => {
    const getAllCompanies = async () => {
      if (!user?.token) return; // agar token missing hai to fetch skip

      try {
        const response = await axios.get(
          "https://job-portel-mern-backend.onrender.com/api/company/companies",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // <-- Direct token pass
            },
          },
        );

        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        }
      } catch (error) {
        console.log(
          "Error in fetching all companies:",
          error.response?.data?.message || error,
        );
      }
    };

    getAllCompanies();
  }, [dispatch, user?.token]); // token dependency add karo

  return;
};

export default useGetAllCompanies;
