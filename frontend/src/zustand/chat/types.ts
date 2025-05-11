import type { user } from "../auth/type";

export type Conversation = {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
};

export type ChatState = {
  users: user[];
  conversations: Conversation[];
  isUsersLoading: boolean;
  selectedUser: user | null;
  getUsers: () => Promise<void>;
  setSelectedUser: (user: user | null) => void;
  getConversations: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;

};


