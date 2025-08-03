import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User, AuthError } from "@supabase/supabase-js";

interface Profile {
  username: string | null;
  country: string | null;
  age: number | null;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: AuthError | null;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  fetchUserProfile: (userId: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  loading: false,
  error: null,
  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },
  setProfile: (profile) => {
    set({ profile });
  },
  fetchUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, country, age")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      set({ profile: null });
    } else {
      set({ profile: data });
    }
  },
  signUp: async (email, password) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ error, loading: false });
    } else {
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ error, loading: false });
    } else {
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error, loading: false });
    } else {
      set({ session: null, user: null, profile: null, loading: false });
    }
  },
}));
