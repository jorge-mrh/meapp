// in src/routes/index.tsx

import { SectionCards } from "@/components/selection-cards";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2  md:pt-20">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
        </div>
      </div>
    </div>
  );
}
