import { useAuthStore } from "../../zustand/auth/auth.store";

const ChatScreen = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default ChatScreen;
