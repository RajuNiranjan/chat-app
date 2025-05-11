import { SelectedUserProfile } from "./SelectedUserProfile";
import ChatHeadder from "./ChatHeadder";
import { ConversationContainer } from "./ConversationContainer";
import { MessageInput } from "./MessageInput";
export const ChatContainer = () => {
  return (
    <div className="flex-1 flex  ">
      <div className="w-[900px] bg-[#33333366] h-full flex flex-col">
        <ChatHeadder />
        <ConversationContainer />
        <MessageInput />
      </div>
      <div>
        <SelectedUserProfile />
      </div>
    </div>
  );
};
