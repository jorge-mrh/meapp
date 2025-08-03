import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ai")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/ai"!</div>;
}
