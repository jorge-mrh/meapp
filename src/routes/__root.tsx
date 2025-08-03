import MainMenu from "@/components/main-menu";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/stores/authStore";

export const Route = createRootRoute({
  component: () => {
    const { setSession } = useAuthStore();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }, [setSession]);

    return (
      <div className="dark bg-background text-foreground min-h-screen">
        <MainMenu />
        <Outlet />
      </div>
    );
  },
});
