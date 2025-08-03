import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/ai")({
  component: Ai,
});

function Ai() {
  return <div>Hello "/ai"!</div>;
}
