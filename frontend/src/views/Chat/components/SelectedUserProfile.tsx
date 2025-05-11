import React from "react";
import { useChatStore } from "../../../zustand/chat/chat.store";
import { XIcon } from "../../../assets";

export const SelectedUserProfile = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="w-[360px] h-full bg-[#66666666] p-4 flex flex-col items-center">
      <div
        className={`w-[300px] h-[400px] bg-cover bg-center overflow-hidden
          bg-no-repeat shadow rounded-2xl`}
        style={{ backgroundImage: `url(${selectedUser?.profilePicture})` }}
      >
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="text-center p-4 ">
            <h1 className="text-white text-2xl font-normal">
              {selectedUser?.userName}
            </h1>
            <p className="text-white text-sm font-normal">
              {selectedUser?.email}
            </p>
          </div>
          <div className="flex items-center p-4  backdrop-blur-sm justify-between w-full">
            <div className="w-10 h-10 rounded-full bg-white flex  items-center gap-1">
              <img
                src={selectedUser?.profilePicture}
                alt=""
                className="w-full h-full object-cover rounded-full border border-white"
              />
              <div>
                <h1 className="text-white text-sm leading-2 font-normal">
                  @{selectedUser?.userName}
                </h1>
                <small className="text-white text-xs font-normal">
                  offline
                </small>
              </div>
            </div>
            <div>
              <img src={XIcon} alt="" className="w-6 h-6 invert" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
