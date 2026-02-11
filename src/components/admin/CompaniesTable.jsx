import React, { useEffect, useState } from "react";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  // Search Filtering Logic
  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="mt-8 border rounded-xl overflow-hidden shadow-sm bg-white">
      <Table>
        <TableCaption className="pb-4">
          A list of your registered companies
        </TableCaption>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[80px] font-bold">Logo</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-slate-500 font-medium"
              >
                No companies found. Please register a new company.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell>
                  <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                    <AvatarImage src={company?.logo} className="object-cover" />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      {company.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {company.location || "No Location"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">
                  {company.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-slate-100 rounded-full transition-all">
                      <MoreHorizontal className="w-5 h-5 text-slate-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 shadow-xl border-slate-100">
                      <div
                        onClick={() =>
                          navigate(`/admin/update/company/${company._id}`)
                        }
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 rounded-md text-indigo-600 font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
