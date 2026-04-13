import { Contact, Edit, Mail, ExternalLink, Briefcase } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { useSelector } from "react-redux";
import AppliedJobs from "./AppliedJobs";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Decorative Top Banner */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="px-8 pb-8">
              <div className="relative flex justify-between items-end -mt-12 mb-6">
                {/* Profile Photo with Ring */}
                <div className="relative">
                  <img
                    src={user?.profile?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSToP5rz4ky9W48e8f3kQ8gdA_b7fyyjP68Eg&s"}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-md"
                  />
                </div>
                
                {/* Edit Button - Modern Style */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm text-gray-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* User Info */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-gray-500 mt-2 leading-relaxed">
                      {user?.profile?.bio || "No bio available. Add a bio to tell recruiters about yourself!"}
                    </p>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                      <Contact className="w-4 h-4 text-green-600" />
                      <span>{user?.phoneNumber || "No phone added"}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Section Sidebar */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user?.profile?.skills && user.profile.skills.length > 0 ? (
                      user.profile.skills.map((item, index) => (
                        <Badge
                          key={index}
                          className="bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors py-1"
                        >
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Add skills...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                   Resume
                </h3>
                {user?.profile?.resume ? (
                  <a
                    href={user?.profile?.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 group"
                  >
                    <span className="underline underline-offset-4">{user?.profile?.resumeName}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 italic">No resume uploaded yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Applied Jobs Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Briefcase className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Applied Jobs</h2>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-2">
              <AppliedJobs />
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Profile;