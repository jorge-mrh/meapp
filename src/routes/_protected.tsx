import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const { session } = useAuthStore.getState();

    if (!session) {
      throw redirect({
        to: "/login",
      });
    }
    const {profile} = useProfileStore.getState();
    const isProfileComplete = !!profile?.username;

    if (!isProfileComplete && location.pathname !== "/complete-profile") {
      throw redirect({
        to: "/complete-profile",
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
