import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/ai")({
  component: Ai,
});

function Ai() {
  return <div className="flex flex-1 flex-col @container/main"><div>Hello "/ai"!</div></div>;
}
