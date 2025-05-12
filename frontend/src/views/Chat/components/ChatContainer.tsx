import ChatHeadder from "./ChatHeadder";
import { ConversationContainer } from "./ConversationContainer";
import { MessageInput } from "./MessageInput";

export const ChatContainer = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none">
        <ChatHeadder />
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0">
          <ConversationContainer />
        </div>
      </div>

      <div className="flex-none">
        <MessageInput />
      </div>
    </div>
  );
};
