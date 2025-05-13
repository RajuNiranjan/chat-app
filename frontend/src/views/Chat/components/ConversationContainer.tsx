import { useEffect, useRef } from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";
import { useAuthStore } from "../../../zustand/auth/auth.store";

export const ConversationContainer = () => {
  const {
    conversations,
    selectedUser,
    getConversations,
    subscribeToMessages,
    unSubscribeToMessages,
  } = useChatStore();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getConversations();
    subscribeToMessages();
    return () => {
      unSubscribeToMessages();
    };
  }, [getConversations, subscribeToMessages, unSubscribeToMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-6 space-y-6 pb-20">
        {conversations?.map((conversation) => (
          <div
            key={conversation._id}
            className={`flex items-end gap-3 ${
              user?._id === conversation.senderId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {user?._id !== conversation.senderId && (
              <div className="flex flex-col items-center gap-1">
                <img
                  loading="lazy"
                  src={selectedUser?.profilePicture}
                  alt={selectedUser?.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-xs text-gray-500">
                  {new Date(conversation.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
            <div
              className={`group relative max-w-[70%] ${
                user?._id === conversation.senderId
                  ? "bg-indigo-600 text-white rounded-2xl rounded-br-none"
                  : "bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm"
              } px-4 py-2.5`}
            >
              <p className="text-sm leading-relaxed">{conversation.message}</p>
              {user?._id === conversation.senderId && (
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {new Date(conversation.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            {user?._id === conversation.senderId && (
              <div className="flex flex-col items-center gap-1">
                <img
                  loading="lazy"
                  src={user?.profilePicture}
                  alt={user?.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
