import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  return (
    <div className="py-16">
      <div className="flex items-center justify-between">
        <h1>All Jobs</h1>
        <Button
          onClick={() => navigate("/admin/create/job")}
          className="bg-orange-500 text-white hover:bg-orange-600  "
        >
          Create New
        </Button>
      </div>
      <div>
        <AdminJobsTable />
      </div>
    </div>
  );
};
export default AdminJobs;
