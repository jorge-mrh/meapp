// src/routes/__root.tsx
import MainMenu from "@/components/main-menu";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/stores/authStore";

export const Route = createRootRoute({
  component: () => {
    const { setSession, fetchUserProfile, setProfile } = useAuthStore();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session) {
          fetchUserProfile(session.user.id);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }, [setSession, fetchUserProfile, setProfile]);

    return (
      <div className="dark bg-background text-foreground min-h-screen">
        <MainMenu />
        <Outlet />
      </div>
    );
  },
});
