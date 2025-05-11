import { useEffect } from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";

export const ChatUsersmenu = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-72 h-full bg-[#66666666]  space-y-[24px]">
      <div className="p-4">
        <h1 className="text-[#666666] text-2xl font-bold">Chats</h1>
      </div>
      <div>
        {users.map((user, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-2 py-2 px-2 border-b border-[#66666670] hover:bg-[#66666666] cursor-pointer transition-all duration-300 ${
              selectedUser?._id === user._id ? "bg-[#66666666]" : ""
            }`}
          >
            <div>
              <img
                src={user.profilePicture}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h1>{user.userName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
