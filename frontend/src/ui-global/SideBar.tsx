import { useAuthStore } from "../zustand/auth/auth.store";

export const SideBar = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-14 shadow-xl h-full bg-[#33333366] flex flex-col justify-end py-10">
      <div className="flex items-center justify-center">
        <img
          src={user?.profilePicture}
          loading="lazy"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </div>
  );
};
