import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { PlaidTransactionResponse } from "@/lib/types/account";

const getTransactions = async (): Promise<PlaidTransactionResponse> => {
  const { data, error } = await supabase.functions.invoke("get-transactions");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchTransactions = () => {
  return useQuery({
    queryKey: ["plaidTransactions"],
    queryFn: getTransactions,
    retry: false,
    staleTime: 1000 * 60 * 15, // Cache data for 15 minutes
  });
};
