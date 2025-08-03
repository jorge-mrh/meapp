import MainMenu from "@/components/main-menu";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="dark bg-background text-foreground min-h-screen">
      <MainMenu></MainMenu>
      <Outlet />
    </div>
  ),
});
