import MainMenu from "@/components/main-menu";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";

export const Route = createRootRoute({
  loader: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    useAuthStore.getState().setSession(session);
  },
  component: Root,
});

function Root() {
    const { setSession } = useAuthStore();
    const {data:profile, isLoading, error} = useFetchProfile();

    useEffect(() => {
      useProfileStore.getState().setProfile(profile);
    }, [profile])

    useEffect(() => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }, [setSession]);

    if (isLoading) {
      return (
        <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center">
          Loading...
        </div>
      );
    }

    if (error) {
      return (
        <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center text-destructive">
          Error loading profile: {error.message}
        </div>
      );
    }

    return (
      <div className="dark bg-background text-foreground min-h-screen top-auto pb-6 md:bottom-auto md:pt-6">
        <MainMenu />
        <Outlet />
      </div>
    );
}
