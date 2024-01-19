import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '@/configs/client.firebase';

export type PremiumPlan = 'basic' | 'premium' | 'trial';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  premiumPlan: PremiumPlan | null;
  setPremiumPlan: (premiumPlan: PremiumPlan) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  logout: () => {
    auth.signOut();
  },
  premiumPlan: null,
  setPremiumPlan: (premiumPlan: PremiumPlan) => {
    set({ premiumPlan });
  },
}));
