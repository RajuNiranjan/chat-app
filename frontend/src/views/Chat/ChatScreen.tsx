import { ChatUsersmenu } from "./components/ChatUsersmenu";
import { ChatContainer } from "./components/ChatContainer";
import { useChatStore } from "../../zustand/chat/chat.store";
const ChatScreen = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="flex h-full">
      <ChatUsersmenu />
      {selectedUser ? (
        <ChatContainer />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-black text-2xl font-normal">
            Select a user to start chatting
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
