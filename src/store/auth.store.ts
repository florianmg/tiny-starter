import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '@/configs/client.firebase';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  logout: () => {
    auth.signOut();
  },
}));
