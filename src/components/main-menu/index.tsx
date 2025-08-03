import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SmartphoneNfc, LogIn, LogOut, MoreHorizontal } from "lucide-react";
import { DRPDWN_NAV, MAIN_NAV } from "@/lib/types/nav";
import { useNavigate, useMatchRoute, Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { useProfile } from "@/hooks/profile/useFetchProfile";

function MainMenu() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const { session, signOut } = useAuthStore();
  const { data: profile, isLoading } = useProfile();
  const isProfileComplete = !!profile?.username;

  const directUser = (path: string) => {
    navigate({ to: path });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:bottom-auto md:top-6">
      <nav className="items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg md:flex">
        {session ? (
          isProfileComplete ? (
            // Profile is complete
            <>
              {MAIN_NAV.map((item) => {
                const isActive = matchRoute({ to: item.path });
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => directUser(item.path)}
                  >
                    <item.Icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="rounded-full bg-primary text-primary-foreground"
                  >
                    <SmartphoneNfc className="h-5 w-5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {DRPDWN_NAV.map((item) => (
                    <DropdownMenuItem
                      key={item.path}
                      onClick={() => directUser(item.path)}
                    >
                      <item.Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Incomplete Profile
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full bg-primary text-primary-foreground"
                >
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        ) : (
          // Is logged out
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/login">
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Link>
          </Button>
        )}
      </nav>
    </div>
  );
}

export default MainMenu;
