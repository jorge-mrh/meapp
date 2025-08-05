import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export const Route = createFileRoute("/_protected")({
  loader: async ({ location }) => {
    const { profile } = useProfileStore.getState();
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
  return (
    <div className="top-auto pb-12 md:bottom-auto md:pt-12">
      <Outlet />
    </div>
  )
}
