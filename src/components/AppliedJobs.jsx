import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";

const AppliedJobs = () => {
  // In the future, you will likely replace this with useSelector to get jobs from Redux
  const jobs = [
    {
      date: "23/02/2025",
      role: "Backend Developer",
      company: "Google",
      status: "Accepted",
    },
    {
      date: "21/02/2025",
      role: "Frontend Developer",
      company: "Microsoft",
      status: "Pending",
    },
    {
      date: "15/02/2025",
      role: "Full Stack Engineer",
      company: "Amazon",
      status: "Rejected",
    },
    {
      date: "10/02/2025",
      role: "Software Engineer",
      company: "Netflix",
      status: "Pending",
    },
  ];

  // Helper function to dynamically style badges based on status
  const getBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200";
    }
  };

  return (
    <div className="w-full">
      {jobs.length <= 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/50">
          <p className="text-gray-500 font-medium">
            You haven't applied to any jobs yet.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow className="hover:bg-transparent border-gray-100">
                <TableHead className="font-semibold text-gray-700 py-4">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4">
                  Job Role
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4">
                  Company
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 text-right pr-6">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors border-gray-50"
                >
                  <TableCell className="text-gray-600 py-4">
                    {job.date}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 py-4">
                    {job.role}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {job.company}
                  </TableCell>
                  <TableCell className="py-4 text-right pr-6">
                    <Badge
                      variant="outline"
                      className={`capitalize px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(job.status)}`}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
