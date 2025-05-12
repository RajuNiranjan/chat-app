import { useEffect } from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";

export const ChatUsersmenu = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">Your conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.map((user, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
              selectedUser?._id === user._id ? "bg-blue-50" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePicture}
                alt={user.userName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-gray-100"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-gray-900 truncate">
                {user.userName}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                Click to start chatting
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
