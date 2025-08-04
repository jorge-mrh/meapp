import { create } from "zustand";
import type { AuthError } from "@supabase/supabase-js";
import type { Profile } from "@/lib/types/profile";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: AuthError | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  setProfile: (profile) => {
    set({ profile });
  },
}));