import { Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" disabled />
            <span className="text-sm">Show online only</span>
          </label>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        <div className="w-full p-3 flex items-center gap-3">
          <div className="relative mx-auto lg:mx-0">
            <img
              src="/avatar.png"
              alt=""
              className="size-12 object-cover rounded-full"
            />

            <span
              className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
            />
          </div>

          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">John Doe</div>
            <div className="text-sm text-zinc-400">Online</div>
          </div>
        </div>

        <div className="text-center text-zinc-500 py-4">No online users</div>
      </div>
    </aside>
  );
};
export default Sidebar;
