import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const { data, error } =
          await supabase.functions.invoke("create-link-token");
        if (error) throw error;
        setLinkToken(data.link_token);
      } catch (err) {
        console.error("Error creating link token:", err);
      }
    };
    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token: any) => {
      await supabase.functions.invoke("exchange-public-token", {
        body: { public_token },
      });
      await queryClient.invalidateQueries({ queryKey: ["plaidBalance"] });
    },
  });

  return (
    <Button onClick={() => open()} disabled={!ready}>
      Link Bank Account
    </Button>
  );
};
