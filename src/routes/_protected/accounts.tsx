import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/accounts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="flex flex-1 flex-col @container/main"><div>Hello "/accounts"!</div></div>;
}
