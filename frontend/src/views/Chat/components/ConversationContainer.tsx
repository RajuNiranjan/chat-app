import { useEffect } from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";
import { useAuthStore } from "../../../zustand/auth/auth.store";

export const ConversationContainer = () => {
  const { conversations, selectedUser, getConversations } = useChatStore();
  const { user } = useAuthStore();
  console.log(conversations);
  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div className="flex-1 h-full overflow-y-scroll flex flex-col gap-2 p-4">
      {conversations.map((conversation) => (
        <div
          key={conversation._id}
          className={`flex items-center gap-2 ${
            user?._id === conversation.senderId
              ? "justify-end"
              : "justify-start"
          }`}
        >
          {user?._id !== conversation.senderId && (
            <img
              src={selectedUser?.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          )}
          <p
            className={`text-sm ${
              user?._id === conversation.senderId
                ? "bg-[#333333] text-white"
                : "bg-[#66666635]"
            } w-max rounded-md p-2`}
          >
            {conversation.message}
          </p>
          {user?._id === conversation.senderId && (
            <img
              src={user?.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  );
};
