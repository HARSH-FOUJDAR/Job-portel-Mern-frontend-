import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  return (
    <div className="py-16 mt-40">
      <div className="flex items-center justify-between">
        <h1>All Companies</h1>
        <Button
          onClick={() => navigate("/admin/create/company")}
          className="bg-orange-500 text-white hover:bg-orange-600 rounded-2xl"
        >
          Create New
        </Button>
      </div>
      <div>
        <CompaniesTable />
      </div>
    </div>
  );
};
export default Companies;
