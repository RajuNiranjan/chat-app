import React from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";
import { XIcon } from "../../../assets";

export const ChatHeadder = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="h-14 bg-[#33333366] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img
          src={selectedUser?.profilePicture}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h1>{selectedUser?.userName}</h1>
      </div>
      <div>
        <button onClick={() => setSelectedUser(null)}>
          <img src={XIcon} alt="" className="invert cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeadder;
