import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SmartphoneNfc } from "lucide-react";
import { DRPDWN_NAV, MAIN_NAV } from "@/lib/types/nav";
import { useNavigate, useMatchRoute } from "@tanstack/react-router";

function MainMenu() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();

  const directUser = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center md:bottom-auto md:top-6">
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
      </nav>
    </div>
  );
}

export default MainMenu;
