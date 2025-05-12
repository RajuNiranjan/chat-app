import { ChatUsersmenu } from "./components/ChatUsersmenu";
import { ChatContainer } from "./components/ChatContainer";
import { useChatStore } from "../../zustand/chat/chat.store";

const ChatScreen = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto h-full p-4">
        <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
          <div className="grid grid-cols-12 h-full">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className=" h-[calc(100vh-8rem)]">
                <ChatUsersmenu />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      Select a contact to start chatting
                    </h2>
                    <p className="text-gray-500">
                      Choose from your contacts to begin a conversation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
