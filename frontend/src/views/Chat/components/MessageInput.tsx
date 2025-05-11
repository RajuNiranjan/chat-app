import { useState } from "react";
import { SendIcon } from "../../../assets";
import { useChatStore } from "../../../zustand/chat/chat.store";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="h-20  p-4">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          name="emailOrUserName"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="John Deo"
          className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
        />
        <button type="submit">
          <img src={SendIcon} alt="" className="w-6 h-6 invert" />
        </button>
      </form>
    </div>
  );
};
