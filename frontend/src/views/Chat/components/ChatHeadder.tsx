import React from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";
import { XIcon } from "../../../assets";

export const ChatHeadder = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={selectedUser?.profilePicture}
            alt={selectedUser?.userName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-indigo-100"
          />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {selectedUser?.userName}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Active now
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <img src={XIcon} alt="Close chat" className="w-5 h-5 opacity-60" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeadder;
