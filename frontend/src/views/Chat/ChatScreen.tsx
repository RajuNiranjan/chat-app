import { ChatUsersmenu } from "./components/ChatUsersmenu";
import { ChatContainer } from "./components/ChatContainer";
import { useChatStore } from "../../zustand/chat/chat.store";
import { useAuthStore } from "../../zustand/auth/auth.store";
import { useRef, useState } from "react";

const ChatScreen = () => {
  const { selectedUser } = useChatStore();
  const { user, logout, updateProfile } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const profileImgRef = useRef<HTMLInputElement>(null);

  const handleOpenFileSelector = () => {
    if (profileImgRef.current) {
      profileImgRef.current.click();
    }
  };

  const handleUploadProfileImage = () => {
    if (profileImgRef.current?.files?.length) {
      const file = profileImgRef.current.files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);
      updateProfile(formData);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto h-full p-4">
        <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
          <div className="grid grid-cols-12 h-full">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-200">
              {/* User Profile Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        loading="lazy"
                        src={user?.profilePicture}
                        alt={user?.userName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-indigo-100"
                      />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">
                        {user?.userName}
                      </h2>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowProfile(!showProfile)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="h-[calc(100vh-12rem)]">
                <ChatUsersmenu />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      Select a contact to start chatting
                    </h2>
                    <p className="text-gray-500">
                      Choose from your contacts to begin a conversation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfile && (
        <div
          className={`fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 ease-in-out transition-all transform duration-300 opacity-100 `}
        >
          <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={user?.profilePicture}
                    alt={user?.userName}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100"
                  />
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      ref={profileImgRef}
                      onChange={handleUploadProfileImage}
                      accept="image/*"
                    />
                    <button
                      type="button"
                      onClick={handleOpenFileSelector}
                      className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
                      title="Change profile picture"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {user?.userName}
                </h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">
                    {new Date(user?.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
