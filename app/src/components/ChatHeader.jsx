import { X } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src="https://i.pravatar.cc/150?img=32" alt="User avatar" />
            </div>
          </div>

          <div>
            <h3 className="font-medium">Sarah Wilson</h3>
            <p className="text-sm text-base-content/70">Active 2m ago</p>
          </div>
        </div>

        <button>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
