import MainMenu from "@/components/main-menu";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    useAuthStore.getState().setSession(session);

    //Need to fetch it directly from supabase because i can't call hooks here, might put this inside component;
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

      useProfileStore.getState().setProfile(profile);
  },
  component: Root,
});

function Root() {
    const { setSession } = useAuthStore();
    useEffect(() => {
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
}
