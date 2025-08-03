import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SmartphoneNfc, LogIn, LogOut } from "lucide-react";
import { DRPDWN_NAV, MAIN_NAV } from "@/lib/types/nav";
import { useNavigate, useMatchRoute, Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";

function MainMenu() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  // Get session and signOut action from the store
  const { session, signOut } = useAuthStore();

  const directUser = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:bottom-auto md:top-6">
      <nav className="items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg md:flex">
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
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Conditional Sign In / Sign Out Button */}
        {session ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        ) : (
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
