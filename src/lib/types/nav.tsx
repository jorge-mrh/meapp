import { Home, MessageSquare, Settings, Brain, Rss } from "lucide-react";

const NAV_OPTIONS = {
  HOME: "/",
  AI: "/ai",
  BLOG: "/blog",
  EMAILME: "/contact",
  PLAYGROUND: "/playground",
};

export const MAIN_NAV = [
  { path: NAV_OPTIONS.HOME, Icon: Home, label: "Home" },
  { path: NAV_OPTIONS.AI, Icon: Brain, label: "AI" },
];

export const DRPDWN_NAV = [
  { path: NAV_OPTIONS.BLOG, Icon: Rss, label: "Blog" },
  { path: NAV_OPTIONS.EMAILME, Icon: MessageSquare, label: "Email Me" },
  { path: NAV_OPTIONS.PLAYGROUND, Icon: Settings, label: "Playground" },
];
