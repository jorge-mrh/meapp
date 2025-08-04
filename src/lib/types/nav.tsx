import {
  Home,
  Settings,
  Brain,
  Wallet,
  User,
  Album,
  Coins,
} from "lucide-react";

const NAV_OPTIONS = {
  HOME: "/",
  AI: "/ai",
  ACTIVITY: "/activity",
  ACCOUNTS: "/accounts",
  PROFILE: "/profile",
  FINANCIAL_PROFILE: "/finprofile",
  SETTINGS: "/settings",
};

export const MAIN_NAV = [
  { path: NAV_OPTIONS.HOME, Icon: Home, label: "Home" },
  { path: NAV_OPTIONS.ACTIVITY, Icon: Coins, label: "Activity" },
  { path: NAV_OPTIONS.ACCOUNTS, Icon: Album, label: "Accounts" },
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
