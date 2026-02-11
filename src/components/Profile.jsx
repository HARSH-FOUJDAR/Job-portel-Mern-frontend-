import { Contact, Edit, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import AppliedJobs from "./AppliedJobs";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="my-12 w-full">
        <div className="p-5 rounded shadow-lg border-2 border-gray-300 lg:w-1/2 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <img
                src={user?.profile?.profilePhoto}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-gray-800 font-semibold">{user?.name}</h1>
                <p className="text-sm text-gray-600 max-w-[500px]">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>
            </div>
            <div>
              <Edit
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Email and Phone Number */}
          <div className="flex flex-col gap-2 my-4 ml-3">
            <div className="flex gap-4">
              <Mail className="w-5 h-5" />
              <p>{user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Contact className="w-5 h-5" />
              <p>{user?.phoneNumber}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Skills</h1>
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-orange-600 text-white ml-2 cursor-pointer hover:bg-orange-700 rounded-full"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <p className="text-gray-600">No skills added</p>
            )}
          </div>

          {/* Resume */}
          <div>
            <h4 className="text-gray-700 mt-5 text-lg font-semibold">Resume</h4>
            <Link
              to={user?.profile?.resume}
              className="hover:underline text-blue-500"
            >
              {user?.profile?.resumeName}
            </Link>
          </div>
        </div>
        <AppliedJobs />
      </div>

      {/* Profile Update Modal */}
      <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Profile;
