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
import { useProfileStore } from "@/stores/profileStore";
import { motion, AnimatePresence } from "motion/react";

function MainMenu() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const { session, signOut } = useAuthStore();
  const { profile } = useProfileStore.getState();
  const isProfileComplete = !!profile?.username;

  const directUser = (path: string) => {
    navigate({ to: path });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="fixed flex justify-center left-0 right-0 bottom-6 md:bottom-auto md:top-6 z-50">
      <motion.nav
        layout
        className="flex items-center justify-center gap-2 rounded-full border bg-background/95 backdrop-blur-sm p-2 shadow-lg md:space-x-4"
      >
        {session ? (
          isProfileComplete ? (
            // Profile is complete
            <>
              {MAIN_NAV.map((item) => {
                const isActive = matchRoute({ to: item.path }) as boolean;
                return (
                  <motion.div
                    layout
                    key={item.path}
                    className="flex items-center"
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="lg"
                      className="rounded-full"
                      onClick={() => directUser(item.path)}
                    >
                      <item.Icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, x: -10 }}
                          animate={{ opacity: 1, width: "auto", x: 0 }}
                          exit={{ opacity: 0, width: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="hidden md:inline-block ml-2 text-sm font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
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
            <DropdownMenu modal={false}>
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
      </motion.nav>
    </div>
  );
}

export default MainMenu;