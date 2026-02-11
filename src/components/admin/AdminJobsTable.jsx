import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react"; // Icons for professional look
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AdminJobsTable = () => {
  const { adminJobs } = useSelector((store) => store.job);
  const jobsArray = Array.isArray(adminJobs) ? adminJobs : [adminJobs];
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto mt-8 px-4">
      {/* Table Container with Shadow and Rounded Corners */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableCaption className="pb-4 text-slate-500 italic">
            A list of your recently posted jobs and openings.
          </TableCaption>

          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700 py-4">
                Title
              </TableHead>
              <TableHead className="font-bold text-slate-700 hidden md:table-cell">
                Salary
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Location
              </TableHead>
              <TableHead className="font-bold text-slate-700 hidden lg:table-cell">
                Experience
              </TableHead>
              <TableHead className="font-bold text-slate-700">Type</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobsArray?.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-slate-50/80 transition-colors cursor-default border-b border-slate-100"
              >
                <TableCell className="font-semibold text-slate-900 py-4">
                  {job?.title}
                </TableCell>

                <TableCell className="text-slate-600 hidden md:table-cell">
                  {job?.salary} LPA
                </TableCell>

                <TableCell className="text-slate-600">
                  {job?.location}
                </TableCell>

                <TableCell className="text-slate-600 hidden lg:table-cell">
                  {job?.experienceLevel} Years
                </TableCell>

                <TableCell>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {job?.jobType}
                  </span>
                </TableCell>

                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    
  );
};

export default AdminJobsTable;
