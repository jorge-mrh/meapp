import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/ai")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Ai,
});

function Ai() {
  return <div>Hello "/ai"!</div>;
}
