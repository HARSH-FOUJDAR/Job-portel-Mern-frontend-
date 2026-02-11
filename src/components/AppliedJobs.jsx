import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
const AppliedJobs = () => {
  const jobs = [
    {
      date: "23/02/2025",
      role: "Backend developer",
      company: "Google ",
      status: "accepted",
    },
    {
      date: "23/02/2025",
      role: "Backend developer",
      company: "Google ",
      status: "accepted",
    },
    {
      date: "23/02/2025",
      role: "Backend developer",
      company: "Google ",
      status: "accepted",
    },
    {
      date: "23/02/2025",
      role: "Backend developer",
      company: "Google ",
      status: "accepted",
    },
  ];
  return (
    <div className="w-full mx-auto mt-5">
      <div className="w-[80%] mx-auto rounded-md border-2 border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800">Applied Jobs</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold">Date</TableHead>
              <TableHead className="text-base font-semibold">
                Job Role
              </TableHead>
              <TableHead className="text-base font-semibold">Company</TableHead>
              <TableHead className="text-base font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="text-base font-medium">
                  {job.date}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job.role}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job.company}
                </TableCell>
                <TableCell>
                  <Badge className="bg-black text-white    cursor-pointer hover:bg-black  rounded-full">
                    {job.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default AppliedJobs;
