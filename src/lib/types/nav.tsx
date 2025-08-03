import { Home, Settings, Brain, Wallet, User } from "lucide-react";

const NAV_OPTIONS = {
  HOME: "/",
  AI: "/ai",
  PROFILE: "/profile",
  FINANCIAL_PROFILE: "/finprofile",
  SETTINGS: "/settings",
};

export const MAIN_NAV = [
  { path: NAV_OPTIONS.HOME, Icon: Home, label: "Home" },
  { path: NAV_OPTIONS.AI, Icon: Brain, label: "AI" },
];

export const DRPDWN_NAV = [
  { path: NAV_OPTIONS.PROFILE, Icon: User, label: "Profile" },
  {
    path: NAV_OPTIONS.FINANCIAL_PROFILE,
    Icon: Wallet,
    label: "Financial Profile",
  },
  { path: NAV_OPTIONS.SETTINGS, Icon: Settings, label: "Settings" },
];
